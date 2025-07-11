import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './models/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signIn: SignInDto) {
    const user = await this.userService.getUserByEmail(signIn.email);

    const isPasswordValid = await bcrypt.compare(
      signIn.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user._id, email: user.email, role: user.ruolo };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
