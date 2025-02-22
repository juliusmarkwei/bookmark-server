import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { SignupDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(private readonly databaseService: DatabaseService) {}

	login() {
		return { msg: 'User login successful', success: true };
	}

	async register(body: SignupDTO) {
		// Implement user registration logic
		try {
			await this.databaseService.user.create({ data: body });
			return { msg: 'User registration successful', success: true };
		} catch {
			return new HttpException(
				'User registration failed',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
