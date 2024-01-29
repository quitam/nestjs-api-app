import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateNoteDto } from './dto'

@Injectable()
export class NoteService {
  constructor(private prismaservice: PrismaService) {}

  async addNote(createNoteDto: CreateNoteDto, userId: number) {
    const { title, description, url } = createNoteDto
    return this.prismaservice.note.create({
      data: {
        title,
        description,
        url,
        user: { connect: { id: userId } }
      }
    })
  }

  async getNoteById(noteId: number) {
    const note = await this.prismaservice.note.findUnique({
      where: { id: noteId, delFlag: 0 }
    })
    if (!note) {
      throw new NotFoundException('note not found')
    }
    return note
  }
}
