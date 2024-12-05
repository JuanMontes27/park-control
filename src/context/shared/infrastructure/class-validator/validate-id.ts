import { IsNumberString } from 'class-validator';

export class ValidateId {
  @IsNumberString()
  id: string;
}
