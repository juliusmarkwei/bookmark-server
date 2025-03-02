import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBookmarkDTO, UpdateBookmarkDTO } from './dto/bookmark.dto';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

@Injectable()
export class BookmarkService {
    constructor(private readonly databaseService: DatabaseService) {}

    async fetchAllBookmarks(userId: string) {
        return await this.databaseService.bookmark.findMany({where: {
            userId
        }});
    }

    async createBookmark(userId: string, data: CreateBookmarkDTO) {
        const {title, description, link} = data
        try {

        await this.databaseService.bookmark.create({data: {
            userId,
            title,
            description,
            link
        }});
        } catch (error) {
            if (error instanceof PrismaClientValidationError) {
                throw new BadRequestException("Invalid data");
            }
            throw new Error("Internal server error");

        }
    }

    async updateBookmark(userId: string, bookmarkId: string, data: UpdateBookmarkDTO) {
        const {title, description, link} = data
        try {
            if (!title && !description && !link) {
                throw new BadRequestException("No data to update");
            }

            const bookmark = await this.databaseService.bookmark.findUnique({where: {
                id: bookmarkId
            }});
            if (!bookmark || bookmark.userId !== userId) {
                throw new BadRequestException("Bookmark not found");
            }
            await this.databaseService.bookmark.update({where:
                {id: bookmarkId}, data: {
                    title,
                    description,
                    link
                }})
        } catch (error) {
            if (error instanceof PrismaClientValidationError) {
                throw new BadRequestException("Invalid data");
            }
            throw new Error("Internal server error");

        }
    }
}
