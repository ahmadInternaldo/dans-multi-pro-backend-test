import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AxiosResponse } from 'axios';
import { PositionDto } from './dto/position.dto';

@ApiTags('Service')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    try {
      return await this.userService.login(loginDto);
    } catch (err) {
      throw new BadRequestException(err.message ?? err);
    }
  }

  @ApiBearerAuth()
  @Get('positions')
  async findAll(@Query() params: PositionDto): Promise<AxiosResponse<any>> {
    return this.userService.findAllPosition(params);
  }

  @ApiBearerAuth()
  @Get('positions/:uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.userService.findOnePosition(uuid);
  }
}
