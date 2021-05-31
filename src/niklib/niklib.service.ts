import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './interfaces/book.interface';
import { AddBookDTO } from './dto/add-book.dto';
import { promisify } from 'util';
import * as fs from 'fs';
const unlinkAsync = promisify(fs.unlink);

@Injectable()
export class NiklibService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async getBooks(): Promise<Book[]> {
    const books = await this.bookModel.find().exec();
    return books;
  }

  async getBook(bookID): Promise<Book> {
    const book = await this.bookModel.findById(bookID).exec();
    return book;
  }

  async addBook(addBookDTO: AddBookDTO): Promise<Book> {
    const newBook = new this.bookModel(addBookDTO);
    return newBook.save();
  }

  async editBook(bookID, addBookDTO: AddBookDTO): Promise<Book> {
    const editedBook = await this.bookModel.findByIdAndUpdate(
      bookID,
      addBookDTO,
      { new: true }
    );
    return editedBook;
  }

  async deleteBook(bookID): Promise<any> {
    const book = await this.bookModel.findById(bookID);
    await unlinkAsync(`files/${book.filename}`);
    await unlinkAsync(`files/${book.img_name}`);
    const deletedBook = await this.bookModel.findByIdAndRemove(bookID);
    return deletedBook;
  }

  async deleteFile(fileName): Promise<any> {
    await unlinkAsync(`files/${fileName}`);
    return true;
  }
}
