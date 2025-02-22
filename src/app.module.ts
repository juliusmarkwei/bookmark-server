import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [AuthModule, BookmarkModule, DatabaseModule],
	providers: [DatabaseService],
})
export class AppModule {}
