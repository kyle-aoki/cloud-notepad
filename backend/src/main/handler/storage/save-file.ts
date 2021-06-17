import { Request, Response, NextFunction } from "express";
import AWS, { S3 } from "aws-sdk";
import sendResponse from "../../response/send-response";
import s3 from "../../S3";

const S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME as string;

export default async function SaveFile(req: Request, res: Response, next: NextFunction) {
  const prefix = `users/${res.locals.username}/`;
  const textToSave = req.body.text;
  const path = req.body.path;
  const fileName = req.body.fileName;

  const Key = prefix + path + fileName;

  const uploadParams = {
    Bucket: S3_BUCKET_NAME,
    Key: Key,
    Body: textToSave,
  };

  const uploadResult = await s3.upload(uploadParams).promise();

  sendResponse(res, { message: "Successfully saved file." }, uploadResult);
}
