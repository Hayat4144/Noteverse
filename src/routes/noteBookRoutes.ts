import uploadMedia from '@/Notebook/UploadMedia';
import addNotebook from '@/Notebook/addNotebook';
import deleteNotebook from '@/Notebook/deleteNotebook';
import noteBookById from '@/Notebook/noteBookById';
import readNotebook from '@/Notebook/readNotebook';
import updateNotebook from '@/Notebook/updateNotebookTitle';
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

noteBookRoutes.post('/api/add/notebook', authMiddleware, addNotebook);
noteBookRoutes.get('/api/read/notebook', authMiddleware, readNotebook);
noteBookRoutes.get(
  '/api/read/id/notebook/:notebookId',
  authMiddleware,
  noteBookById,
);
noteBookRoutes.delete(
  '/api/delete/id/notebook/:notebookId',
  authMiddleware,
  deleteNotebook,
);

noteBookRoutes.put('/api/update/notebook', authMiddleware, updateNotebook);

export default noteBookRoutes;
