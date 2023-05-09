import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as JwtService from 'jsonwebtoken';

const validation = async (token: string): Promise<any> => {
  try {
    const output: any = JwtService.verify(
      token.replace(`Bearer `, ''),
      process.env.SECRET_KEY,
    );
    return output;
  } catch (err) {
    if (err.message === 'jwt expired') {
      throw new BadRequestException('Login Expired');
    } else {
      throw new BadRequestException('Error login');
    }
  }
};

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers.authorization) {
        req['user'] = await validation(String(req.headers.authorization));
      } else {
        throw new ForbiddenException('Access Forbidden!');
      }
      next();
    } catch (err) {
      throw new BadRequestException(err.message ?? err);
    }
  }
}
