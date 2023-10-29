import {
  UseInterceptors,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiKeyGuard } from 'src/module/auth/guard/apikey.guard';
import { AuthGuard } from 'src/module/auth/guard/auth.guard';

@Controller('api/v1/upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseGuards(AuthGuard, ApiKeyGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/img',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.local(file);
  }
}
