import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { LoginDTO, SignupDTO } from './dto/auth.dto';
import * as _ from "../utils/constants"
import * as argon2 from "argon2"
import { JwtService } from '@nestjs/jwt';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
	constructor(private readonly databaseService: DatabaseService, private readonly jwtService: JwtService ) { }

	async signToken(userId: string, email: string): Promise<string> {
		const payload = { userId, email };
		return await this.jwtService.signAsync(payload, {expiresIn: '1d', secret: process.env.JWT_SECRET});
	}

	async login(body: LoginDTO) {
		try {

		const user = await this.databaseService.user.findUnique({ where: { email: body.email } });
		if (!user) {
            throw new BadRequestException('Invalid credentials');

        }

		const isPasswordValid = await argon2.verify(user.password, body.password);
		if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }

		const token = await this.signToken(user.id, user.email);
		return { token, success: true };
		} catch (error) {
			if (error instanceof PrismaClientValidationError) {
				throw new BadRequestException(_.SIGNUP_FAILURE_MESSAGE);
			}
		}
	}

	async register(body: SignupDTO) {
		const existingUser = await this.databaseService.user.findFirst({ where: { email: body.email } })
		if (existingUser) {
			throw new BadRequestException(_.SIGNUP_BAD_EMAIL);
		}
		try {
			const hash = await argon2.hash(body.password)
			await this.databaseService.user.create({
				data: {
					fullName: body.fullName,
					email: body.email,
					password: hash
				}
			});
			return { msg: _.SIGNUP_SUCCESS_MESSAGE, success: true };
		} catch {
			throw new HttpException(
				_.SIGNUP_FAILURE_MESSAGE,
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
