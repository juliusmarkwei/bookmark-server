import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CustomRequest } from 'src/utils/types/request';
import { CreateBookmarkDTO, UpdateBookmarkDTO } from './dto/bookmark.dto';
import { JWTGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';


@Controller('bookmarks')
@UseGuards(JWTGuard)
export class BookmarkController {
	constructor(private readonly bookmarkService: BookmarkService) {}

	@Get()
	async getBookmarks(@GetUser('userId') userId: string) {
		const bookmarks = await this.bookmarkService.fetchAllBookmarks(userId)
		return {success: true ,bookmarks};
	}

	@Post()
	async createBookmark(@GetUser('userId') userId: string, @Body() body: CreateBookmarkDTO) {
		await this.bookmarkService.createBookmark(userId, body)
		return {success: true};
	}

	@Patch(':bookmarkId')
	async updateBookmark(@GetUser('userId') userId: string, @Body() body: UpdateBookmarkDTO, @Param('bookmarkId') bookmarkId: string) {
		await this.bookmarkService.updateBookmark(userId, bookmarkId, body)
		return {success: true};
	}

	@Delete(':bookmarkId')
	async deleteBookmark(@GetUser('userId') userId: string, @Param('bookmarkId') bookmarkId: string) {
		await this.bookmarkService.deleteBookmark(userId, bookmarkId)
		return {success: true};
	}
}
