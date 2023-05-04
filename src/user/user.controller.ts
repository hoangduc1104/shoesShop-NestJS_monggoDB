import { User } from './schema/user.schema';
import { UserService } from './user.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
import {
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadHelper } from 'src/helpper/upload.helpper';
import { Observable, of } from 'rxjs';

// export const storage = diskStorage({
//   destination: './uploads',
//   filename: (req, file, callback) => {
//     callback(null, generateFilename(file));
//   },
// });

// function generateFilename(file) {
//   return `${Date.now()}.${extname(file.originalname)}`;
// }

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Query() query: ExpressQuery): Promise<User[]> {
    return this.userService.findAll(query);
  }

  @Get('/:email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }
  @Get('me/:email')
  async findByE(@Param('email') email: string) {
    return this.userService.findByEmailUser(email);
  }

  @Get('/phone/:phone')
  async findByPhoneNumber(@Param('phone') phone: string) {
    return this.userService.findByPhonenumber(phone);
  }

  @Post('/upload/:userId')
  @UseGuards(AuthGuard())
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: UploadHelper.destinationPath,
        filename: UploadHelper.customFileName,
      }),
    }),
  )
  async uploadFile(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadAvatar(file.filename, userId);
  }

  @Get('profile-image/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res) {
    return of(res.sendFile(join(process.cwd(), 'uploads/user/' + imagename)));
  }
}
