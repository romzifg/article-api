import { HttpException, HttpStatus } from '@nestjs/common';

export class UploadService {
  async local(file: Express.Multer.File) {
    try {
      return {
        statusCode: 200,
        message: 'Success',
        data: file.path,
      };
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
