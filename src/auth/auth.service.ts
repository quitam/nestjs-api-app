import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async register(authDto: AuthDto) {
    const hashedPassword = await argon.hash(authDto.password);
    // insert user to database
    const user = await this.prismaService.user.create({
      data: {
        email: authDto.email,
        hashedPassword: hashedPassword,
        fullName: authDto.fullName,
      },
    });
    return user;
  }

  login() {
    return {
      message: 'login user success',
    };
  }
}
