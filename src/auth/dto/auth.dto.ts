import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDTO {
	@IsNotEmpty()
	@MinLength(3, { message: 'Please enter at least 3 characters' }) //+
	fullName: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	@MinLength(5, { message: 'Please enter at least 5 characters' }) //+
	password: string;
}

export class LoginDTO {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	@MinLength(5, { message: 'Please enter at least 5 characters' }) //+
	password: string;
}
