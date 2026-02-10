import { IsIn, IsString } from 'class-validator';

const REACTION_TYPES = ['like', 'love', 'haha'] as const;

export class CreateReactionDto {
  @IsString()
  @IsIn(REACTION_TYPES)
  type!: string;
}
