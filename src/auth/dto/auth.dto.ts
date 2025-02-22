import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDTO {
	@IsNotEmpty()
	@MinLength(3, { message: 'Please enter at least 3 characters' }) //+
	username: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	@MinLength(5, { message: 'Please enter at least 5 characters' }) //+
	password: string;
}
