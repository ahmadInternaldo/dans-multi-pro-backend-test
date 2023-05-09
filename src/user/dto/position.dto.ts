import { ApiProperty } from '@nestjs/swagger';
import { PositionInterface } from '../interfaces/position.interface';

export class PositionDto implements PositionInterface {
  @ApiProperty({
    name: 'page',
    required: false,
    type: String,
    default: '1',
  })
  page: string;

  @ApiProperty({
    name: 'description',
    required: false,
    type: String,
    default: 'python',
  })
  description: string;

  @ApiProperty({
    name: 'location',
    required: false,
    type: String,
    default: 'berlin',
  })
  location: string;

  @ApiProperty({
    name: 'full_time',
    required: false,
    type: Boolean,
  })
  full_time: string;
}
