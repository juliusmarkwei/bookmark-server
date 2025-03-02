import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookmarkService } from './bookmark.service';
import { CustomRequest } from 'src/utils/types/request';
import { CreateBookmarkDTO, UpdateBookmarkDTO } from './dto/bookmark.dto';


@Controller('bookmarks')
@UseGuards(AuthGuard('jwt'))
export class BookmarkController {
	constructor(private readonly bookmarkService: BookmarkService) {}

	@Get()
	async getBookmarks(@Req() request: CustomRequest) {
		const {userId} = request.user;
		const bookmarks = await this.bookmarkService.fetchAllBookmarks(userId)
		return {success: true ,bookmarks};
	}

	@Post()
	async createBookmark(@Req() request: CustomRequest, @Body() body: CreateBookmarkDTO) {
		const {userId} = request.user
		await this.bookmarkService.createBookmark(userId, body)
		return {success: true};
	}

	@Patch(':bookmarkId')
	async updateBookmark(@Req() request: CustomRequest, @Body() body: UpdateBookmarkDTO, @Param('bookmarkId') bookmarkId: string) {
		const {userId} = request.user
		await this.bookmarkService.updateBookmark(userId, bookmarkId, body)
		return {success: true};
	}
}
