import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsOptional()
  description?: string

  @IsOptional()
  url?: string
}
