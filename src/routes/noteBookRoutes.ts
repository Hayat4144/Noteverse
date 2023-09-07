import uploadMedia from '@/Notebook/UploadMedia';
import authMiddleware from '@/middlewares/authMiddleware';
import express from 'express';
import multer from 'multer';

const fileupload = multer();
const noteBookRoutes = express.Router();

noteBookRoutes.post(
  '/api/notebook/image/upload',
  authMiddleware,
  fileupload.array('images', 10),
  uploadMedia,
);

export default noteBookRoutes;
