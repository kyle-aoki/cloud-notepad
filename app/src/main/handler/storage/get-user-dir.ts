import { Request, Response, NextFunction } from "express";
import AWS, { S3 } from "aws-sdk";
import sendResponse from "../../response/send-response";
import s3 from "../../S3";

interface NewItem {
  isFolder: boolean;
  size?: string;
  path: string[];
  itemName: string;
  lastModified: string;
}

export default async function GetUserDir(req: Request, res: Response, next: NextFunction) {
  const prefix = `users/${res.locals.username}`;
  const prefixLength = prefix.length;

  const bucketParams: S3.ListObjectsRequest = {
    Bucket: "dark-notepad-bucket",
    Prefix: prefix,
    MaxKeys: 10000,
  };

  const listObjectsRequest = s3.listObjectsV2(bucketParams);
  const listObjectsResponse = await listObjectsRequest.promise().catch(handleListObjectsError);

  if (!listObjectsResponse) throw { message: "Failed to get user directory." };
  const rawDirContents = listObjectsResponse.Contents;

  if (!rawDirContents || rawDirContents.length === 0) {
    return sendResponse(res, { type: "EMPTY_DIR", message: "Empty directory." });
  }

  const formattedDirContents: any[] = formatRawDirContents(rawDirContents, prefixLength);

  sendResponse(
    res,
    { type: "CONTENTFUL DIR", message: "Successfully retrieved user's directory." },
    formattedDirContents
  );
}

function handleListObjectsError() {
  throw { message: "Failed to get user's directory." };
}

function formatRawDirContents(rawDirContents: S3.ObjectList, prefixLength: number) {
  const formattedDirContents: any[] = [];

  for (const item of rawDirContents) {
    if (!item.Key || item.Size === undefined || !item.LastModified) continue;

    const path: string[] = item.Key.slice(prefixLength).split("/");
    path.shift();

    const isFolder: boolean = path[path.length - 1] === "";
    if (isFolder) path.pop();
    if (path.length === 0) continue;

    const itemName = path.pop() as string;

    const DateModfied = new Date(item.LastModified);
    const FormattedDate = `${DateModfied.toLocaleDateString()} ${DateModfied.toLocaleTimeString()}`;

    const newItem: NewItem = {
      isFolder: isFolder,
      path: path,
      itemName: itemName,
      lastModified: FormattedDate,
    };

    if (!newItem.isFolder) newItem.size = `${item.Size.toString()} KB`;

    formattedDirContents.push(newItem);
  }

  return formattedDirContents;
}
