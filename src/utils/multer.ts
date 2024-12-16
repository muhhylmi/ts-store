import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

// Konfigurasi Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder tempat menyimpan file
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});
  
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // File diterima
  } else {
    cb(new Error('File type not supported')); // File ditolak
  }
};
  
const upload = multer({ storage, fileFilter }); // Konfigurasi Multer

export default upload;