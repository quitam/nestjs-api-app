import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import * as argon from 'argon2'
import { RegisterDto, LoginDto } from './dto'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await argon.hash(registerDto.password)
    try {
      // insert user to database
      const user = await this.prismaService.user.create({
        data: {
          email: registerDto.email,
          hashedPassword: hashedPassword,
          fullName: registerDto.fullName
        },
        // select only id, email, fullName, createdAt
        select: {
          id: true,
          email: true,
          fullName: true,
          createdAt: true
        }
      })
      return user
    } catch (error) {
      if (error.code === 'P2002') {
        return {
          message: 'email already exists'
        }
      }
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginDto.email
      }
    })
    if (!user) {
      throw new ForbiddenException('user not found')
    }
    const passwordMatched = await argon.verify(
      user.hashedPassword,
      loginDto.password
    )

    if (!passwordMatched) {
      throw new ForbiddenException('email or password is wrong')
    }
    return {
      success: true,
      data: await this.convertToJwtToken(user.id, user.email)
    }
  }

  async convertToJwtToken(
    userId: number,
    email: string
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email: email
    }
    const jwtToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: this.configService.get<string>('JWT_SECRET')
    })
    return {
      accessToken: jwtToken
    }
  }
}
