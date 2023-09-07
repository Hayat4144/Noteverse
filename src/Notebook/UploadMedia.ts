import { httpStatusCode } from '@/types/httpStatusCode';
import asyncHandler from '@/utils/asyncHandler';
import { Response, Request, NextFunction } from 'express';
import sharp from 'sharp';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import prisma from '@/config/databaseConfig';

interface UploadedImage {
  url: string;
  publicId: string;
}

const uploadImage = (item: { buffer: Buffer }): Promise<UploadedImage> => {
  return new Promise<UploadedImage>(async (resolve, reject) => {
    const imageBuffer = Buffer.from(item.buffer);

    // Resize image to 800x600
    const resizedImageBuffer = await sharp(imageBuffer)
      .resize(800, 600)
      .toBuffer();

    // Compress image with quality set to 70
    const compressedImageBuffer = await sharp(resizedImageBuffer)
      .jpeg({ quality: 70 })
      .toBuffer();

    // Remove metadata from the image
    const strippedImageBuffer = await sharp(compressedImageBuffer)
      .withMetadata({ orientation: undefined })
      .toBuffer();

    const stream = cloudinary.uploader.upload_stream(
      { unique_filename: true, folder: 'notebook', chunk_size: 6000000 },
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          data?.url
            ? resolve({ url: data.secure_url, publicId: data.public_id })
            : reject(error);
        }
      },
    );
    streamifier.createReadStream(strippedImageBuffer).pipe(stream);
  });
};

const uploadMedia = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const { noteBookId } = req.body;
    const images: Express.Multer.File[] = req.files as Express.Multer.File[];
    const ImageUploadPromise = Promise.all(
      images.map((item) => uploadImage(item)),
    );
    ImageUploadPromise.then(async (images) => {
      const data = await Promise.all(
        images.map(async (image) => {
          const insertImage = await prisma.mediaFile.create({
            data: {
              url: image.url,
              publicId: image.publicId,
              Notebook: { connect: { id: noteBookId } },
            },
          });
          return { url: insertImage.url };
        }),
      );
      return res.status(httpStatusCode.OK).json({ data });
    }).catch((error) => {
      return res
        .status(httpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    });
  },
);

export default uploadMedia;
