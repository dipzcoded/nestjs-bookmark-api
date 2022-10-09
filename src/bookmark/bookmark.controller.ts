import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, UpdateBookmarkDto } from './dtos';

@UseGuards(JwtGuard)
@Controller('api/bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get('/')
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks();
  }

  @Post('/')
  createBookmark(
    @GetUser('id') userId: number,
    @Body() createBoookmarkDto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark();
  }

  @Get('/:id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bookmarkService.getBookmarkById();
  }

  @Patch('/:id')
  updateBookmarkById(
    @GetUser('id') userId: number,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bookmarkService.editBookmarkById();
  }

  @Delete('/:id')
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bookmarkService.deleteBookmarkById();
  }
}
