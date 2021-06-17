import { Request, Response, NextFunction } from "express";
import AWS, { S3 } from "aws-sdk";
import s3 from "../../S3";
import sendResponse from "../../response/send-response";

const S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME as string;

export default async function GetFile(req: Request, res: Response, next: NextFunction) {
  const prefix = `users/${res.locals.username}/`;
  const path = req.body.path;
  const fileName = req.body.fileName;

  const Key = prefix + path + fileName;
  const SignedUrlExpireSeconds = 60;

  const url = await s3.getSignedUrlPromise("getObject", {
    Bucket: S3_BUCKET_NAME,
    Key: Key,
    Expires: SignedUrlExpireSeconds,
  });

  sendResponse(res, { message: "Successfully retrieved file." }, url);
}
