import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('bookmarks')
export class BookmarkController {
	@UseGuards(AuthGuard('jwt'))
	@Get()
	getBookmarks(@Req() request: Request) {
        console.log(request.user)
		return { bookmarks: [], success: true };
	}
}
