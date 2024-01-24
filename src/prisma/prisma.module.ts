import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Global decorator makes the PrismaService available everywhere in the app
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Other modules can use the PrismaService
})
export class PrismaModule {}
