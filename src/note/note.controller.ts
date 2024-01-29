import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { NoteService } from './note.service'
import { CreateNoteDto } from './dto'
import { GetUser } from 'src/auth/decorator'
import { MyJwtGuard } from '../auth/guard'

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get('all')
  @UseGuards(MyJwtGuard)
  getAllNotes() {
    return 'All notes'
  }

  @Get(':id')
  getNoteById(@Param('id') noteId: number | string) {
    return this.noteService.getNoteById(Number(noteId))
  }

  @UseGuards(MyJwtGuard)
  @Post('add')
  addNote(@GetUser('id') userId: number, @Body() createNoteDto: CreateNoteDto) {
    return this.noteService.addNote(createNoteDto, userId)
  }
}
