import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto<T> {
  @ApiProperty()
  data: T[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  last_page: number;
}