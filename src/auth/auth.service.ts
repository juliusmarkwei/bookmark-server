import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  /**
   * Authenticates a user and returns a success message.
   *
   * @remarks
   * This function is responsible for handling user login.
   * It does not perform any actual authentication logic.
   *
   * @returns A success message indicating that the user has been logged in.
   */
  login() {
    return { msg: 'User login successful', success: true };
  }
}
