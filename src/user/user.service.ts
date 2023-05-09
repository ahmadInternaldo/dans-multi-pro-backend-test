import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { PositionDto } from './dto/position.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly httpService: HttpService,
  ) {}
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.userRepository.findOne({
      where: { username: loginDto.username },
    });

    if (!user) {
      throw new BadRequestException('user not found');
    } else {
      const isMatch = await bcrypt.compare(loginDto.password, user.password);

      if (!isMatch) {
        throw new BadRequestException('Email/password Wrong!');
      } else {
        return {
          token: jwt.sign(
            {
              uuid: user.uuid,
              username: user.username,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: '1d',
            },
          ),
        };
      }
    }
  }

  async findAllPosition(params: PositionDto): Promise<AxiosResponse<any>> {
    const { data } = await this.httpService.axiosRef.get(
      `${process.env.URL}.json`,
      { params },
    );
    return data;
  }

  async findOnePosition(uuid: string): Promise<AxiosResponse<any>> {
    const { data } = await this.httpService.axiosRef.get(
      `${process.env.URL}/${uuid}`,
    );
    return data;
  }
}
