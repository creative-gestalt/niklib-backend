import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Query,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NiklibService } from './niklib.service';
import { AddBookDTO } from './dto/add-book.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';
import {
  editFileName,
  readerFileFilter,
} from './shared/utils/file-uploading.utils';
import { diskStorage } from 'multer';
import { AuthGuard } from '../auth/auth.guard';
import { AuthQueryGuard } from '../auth/auth-query.guard';
import { AuthService } from '../auth/auth.service';

@Controller('niklib')
export class NiklibController {
  constructor(
    private niklibService: NiklibService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('books')
  async getBooks(@Res() res) {
    const books = await this.niklibService.getBooks();
    return res.status(HttpStatus.OK).json(books);
  }

  @UseGuards(AuthGuard)
  @Get('book/:bookID')
  async getBook(@Res() res, @Param('bookID', new ValidateObjectId()) bookID) {
    const book = await this.niklibService.getBook(bookID);
    if (!book) throw new NotFoundException('Book does not exist!');
    return res.status(HttpStatus.OK).json(book);
  }

  @UseGuards(AuthGuard)
  @Get('files/:filename')
  async getUploadedFile(@Res() res, @Param('filename') filename: string) {
    return res.sendFile(filename, { root: 'files' });
  }

  @UseGuards(AuthQueryGuard)
  @Get('files/download/:filename')
  async getUploadedFileQuery(@Res() res, @Param('filename') filename: string) {
    return res.sendFile(filename, { root: 'files' });
  }

  @UseGuards(AuthQueryGuard)
  @Get('images/:filename')
  async getUploadedImageQuery(@Res() res, @Param('filename') filename: string) {
    return res.sendFile(filename, { root: 'files' });
  }

  @UseGuards(AuthGuard)
  @Post('/book')
  async addBook(@Res() res, @Body() addBookDTO: AddBookDTO) {
    const newBook = await this.niklibService.addBook(addBookDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Book has been submitted successfully!',
      book: newBook,
    });
  }

  @UseGuards(AuthGuard)
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: readerFileFilter,
    }),
  )
  async uploadFile(@Res() res, @UploadedFile() file: Express.Multer.File) {
    return res.status(HttpStatus.OK).json({
      message: 'Book has been submitted successfully!',
      originalName: file.originalname,
      filename: file.filename,
    });
  }

  @UseGuards(AuthGuard)
  @Put('/edit')
  async editBook(
    @Res() res,
    @Query('bookID', new ValidateObjectId()) bookID,
    @Body() addBookDTO: AddBookDTO,
  ) {
    const editedBook = await this.niklibService.editBook(bookID, addBookDTO);
    if (!editedBook) throw new NotFoundException('Book does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Book has been successfully updated',
      book: editedBook,
    });
  }

  @UseGuards(AuthGuard)
  @Delete('/delete')
  async deleteBook(
    @Res() res,
    @Query('bookID', new ValidateObjectId()) bookID,
  ) {
    const deletedBook = await this.niklibService.deleteBook(bookID);
    if (!deletedBook) throw new NotFoundException('Book does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Book has been deleted!',
      book: deletedBook,
    });
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/file')
  async deleteFile(@Res() res, @Query('fileName') fileName) {
    const deletedBook = await this.niklibService.deleteFile(fileName);
    if (!deletedBook) throw new NotFoundException('File does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'File has been deleted!',
    });
  }
}
