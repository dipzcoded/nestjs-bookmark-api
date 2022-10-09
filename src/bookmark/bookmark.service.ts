import { Injectable } from '@nestjs/common';
import { bookmarkInterface } from './interfaces/boomark.interface';

@Injectable()
export class BookmarkService implements bookmarkInterface {
  getBookmarks(): void {
    throw new Error('Method not implemented.');
  }
  getBookmarkById(): void {
    throw new Error('Method not implemented.');
  }
  createBookmark(): void {
    throw new Error('Method not implemented.');
  }
  editBookmarkById(): void {
    throw new Error('Method not implemented.');
  }
  deleteBookmarkById(): void {
    throw new Error('Method not implemented.');
  }
}
