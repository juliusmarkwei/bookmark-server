import { IsNotEmpty, IsOptional, IsUrl, MinLength } from 'class-validator';

export class CreateBookmarkDTO {
	@IsNotEmpty()
	@MinLength(3, { message: 'title should be more than 3 characters' })
	title: string;

	@IsOptional()
	@MinLength(3, { message: 'description should be more than 3 characters' })
	description: string;

	@IsNotEmpty()
	@IsUrl()
	link: string;
}

export class UpdateBookmarkDTO {
	@IsOptional()
	@MinLength(3, { message: 'title should be more than 3 characters' })
	title: string;

	@IsOptional()
	@MinLength(3, { message: 'description should be more than 3 characters' })
	description: string;

	@IsOptional()
	@IsUrl()
	link: string;
}
