import { Bind, Body, Controller, Get, ParseFilePipe, Post, Render, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express'; // Import Response for TypeScript typing
import { FileSizeValidationPipe } from 'utils/validation-pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello(): object {
    return {}; // This renders the index.ejs file initially
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @Bind(UploadedFile())
  uploadFile(file, @Res() res: Response) {
    console.log(file); // Logs the uploaded file details to the console
    // After processing the file or doing necessary operations,
    // redirect to another route, e.g., to the homepage or a 'success' page
    res.redirect('/success'); // Change '/' to the path you want to redirect to
  }

  @Get("/success")
  @Render('success')
  getSuccessPage(@Res() res: Response) {

  }

  @Post('file')
  uploadFileAndPassValidation(
    @Body() body: SampleDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          FileSizeValidationPipe
        ]
      })
    )
    file: Express.Multer.File,
  ) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }
}
