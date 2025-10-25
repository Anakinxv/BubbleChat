import { NextResponse, NextRequest } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import prisma from "@/lib/prisma";
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { filename, filetype, fileSpace, userId, spaceId } =
      await request.json();

    const uniqueName = `${uuidv4()}-${filename}`;
    const fileKey = (() => {
      switch (fileSpace) {
        case "user":
          return `users/${userId}/${uniqueName}`;
        case "banner":
          return `banners/${userId}/${uniqueName}`;
        case "profile":
          return `profiles/${userId}/${uniqueName}`;
        case "chat":
          return `chats/${spaceId}/users/${userId}/${uniqueName}`;
        case "community":
          return `communities/${spaceId}/users/${userId}/${uniqueName}`;
        case "story":
          return `stories/${userId}/${uniqueName}`;
        default:
          return `misc/${userId}/${uniqueName}`;
      }
    })();

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileKey,
      ContentType: filetype,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    return NextResponse.json({ url: signedUrl, key: fileKey });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate signed URL" },
      { status: 500 }
    );
  }
}
