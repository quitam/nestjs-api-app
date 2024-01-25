import { Controller, Get, UseGuards } from '@nestjs/common'
import { GetUser } from 'src/auth/decorator'
import { MyJwtGuard } from '../auth/guard'
import { User } from '@prisma/client'

@Controller('users')
export class UserController {
  @UseGuards(MyJwtGuard)
  @Get('me')
  me(@GetUser() user: User) {
    return user
  }
}
