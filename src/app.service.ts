import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  serviceUp(): string {
    return 'Service Running';
  }
}
