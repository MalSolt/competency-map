import * as uniqid from 'uniqid';
import { diskStorage } from 'multer';
import * as path from 'path';

export const uploadsStorage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (_, file, cb) => {
      console.log(file);
      console.log(path);

      const extension = path.extname(file.originalname);
      const filename = uniqid();

      cb(null, `${filename}${extension}`);
    },
  }),
};
