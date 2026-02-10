import { ArrayMinSize, IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateThreadDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  participantIds!: string[];

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  isGroup?: boolean;
}
