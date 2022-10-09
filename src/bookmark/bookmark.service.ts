import { BadRequestException, Injectable } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto, UpdateBookmarkDto } from './dtos';
import { bookmarkInterface } from './interfaces/boomark.interface';

@Injectable()
export class BookmarkService implements bookmarkInterface {
  constructor(private prismaService: PrismaService) {}

  async getBookmarks(
    userId: number,
  ): Promise<{ status: string; bookmarks: Bookmark[] }> {
    const userBookmarks = await this.prismaService.bookmark.findMany({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            createdAt: true,
            id: true,
          },
        },
      },
    });

    return {
      status: 'success',
      bookmarks: userBookmarks,
    };
  }
  async getBookmarkById(
    userId: number,
    bookmarkId: number,
  ): Promise<{ status: string; bookmark: Bookmark }> {
    const bookmark = await this.prismaService.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            createdAt: true,
            id: true,
          },
        },
      },
    });

    if (!bookmark) {
      throw new BadRequestException('bookmark does not exist');
    }

    if (bookmark.userId !== userId) {
      throw new BadRequestException(
        'bookmark not belong to authenticated user',
      );
    }

    return {
      status: 'success',
      bookmark,
    };
  }
  async createBookmark(
    userId: number,
    createBoookmarkDto: CreateBookmarkDto,
  ): Promise<{ status: string; bookmark: Bookmark }> {
    const newUserBookmark = await this.prismaService.bookmark.create({
      data: {
        ...createBoookmarkDto,
        userId: userId,
      },
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            createdAt: true,
            id: true,
          },
        },
      },
    });

    return {
      status: 'success',
      bookmark: newUserBookmark,
    };
  }
  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    updateBookmarkDto: UpdateBookmarkDto,
  ): Promise<{ status: string; bookmark: Bookmark }> {
    const result = await this.getBookmarkById(userId, bookmarkId);
    if (result.bookmark && result.status === 'success') {
      const updateUserBookmark = await this.prismaService.bookmark.update({
        where: {
          id: bookmarkId,
        },
        data: {
          ...updateBookmarkDto,
        },
        include: {
          user: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
              createdAt: true,
              id: true,
            },
          },
        },
      });

      return {
        status: 'success',
        bookmark: updateUserBookmark,
      };
    }
  }
  async deleteBookmarkById(
    userId: number,
    bookmarkId: number,
  ): Promise<{ status: string; message: string }> {
    const result = await this.getBookmarkById(userId, bookmarkId);
    if (result.bookmark && result.status === 'success') {
      await this.prismaService.bookmark.delete({
        where: {
          id: bookmarkId,
        },
      });

      return {
        status: 'success',
        message: 'bookmark was deleted successfully!',
      };
    }
  }
}
