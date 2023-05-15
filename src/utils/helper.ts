import { HttpStatus } from '@nestjs/common';
import { Constant } from './constamts';

export class Helper {
  static render(statusCode: HttpStatus, message: Constant) {
    return { statusCode, message };
  }
}
