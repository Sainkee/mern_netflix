import multer from "multer";
import path, { dirname } from "path";
import fs from "fs";

import { fileURLToPath } from "url";
import customError from "../utils/error.js";

const fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(fileName);
let storage;
try {
  const uploadDir = path.join(__dirname, "../public");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  storage = multer.diskStorage({
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
  });
} catch (error) {
  throw new customError("error while getting directory");
}

const upload = multer({
  storage: storage,

  fileFilter: function (req, file, cb) {
    const allowedTypes = ["image/png", "image/gif", "image/jpeg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new customError("Unsupported file type", 400), false);
    }
    cb(null, true);
  },
});

export default upload;
