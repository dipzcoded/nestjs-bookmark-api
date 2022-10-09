import { Bookmark } from '@prisma/client';
import { CreateBookmarkDto, UpdateBookmarkDto } from '../dtos';

export interface bookmarkInterface {
  getBookmarks(userId: number): Promise<{
    status: string;
    bookmarks: Bookmark[];
  }>;
  getBookmarkById(
    userId: number,
    bookmarkId: number,
  ): Promise<{
    status: string;
    bookmark: Bookmark;
  }>;
  createBookmark(
    userId: number,
    createBoookmarkDto: CreateBookmarkDto,
  ): Promise<{
    status: string;
    bookmark: Bookmark;
  }>;
  editBookmarkById(
    userId: number,
    bookmarkId: number,
    updateBookmarkDto: UpdateBookmarkDto,
  ): Promise<{
    status: string;
    bookmark: Bookmark;
  }>;
  deleteBookmarkById(
    userId: number,
    bookmarkId: number,
  ): Promise<{
    status: string;
    message: string;
  }>;
}
