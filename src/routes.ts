import { Router } from 'express';
import multer from 'multer';
import { validateController } from './controllers';

const routes = Router();

const multerConfig = multer();

routes.post("/validate", multerConfig.single("file"), (request, response) => {
  return validateController.handle(request, response);
});

export { routes };
