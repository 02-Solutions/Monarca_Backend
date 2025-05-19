import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

export const UploadPdfInterceptor = () => {
  const uploadPath = join(process.cwd(), 'uploads', 'reservations');

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return FileFieldsInterceptor(
    [
      { name: 'file', maxCount: 1 },
    ],
    {
      storage: diskStorage({
        destination: uploadPath,
        filename: (_, file, cb) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
      fileFilter: (_, file, cb) => {
        // allow only pdf or xml
        if (!file.mimetype.match(/\/pdf$/) ) {
          return cb(new Error('Only PDF files are allowed'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    },
  );
};
