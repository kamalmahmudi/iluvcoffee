import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a coffee.' })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ description: 'The brand of a coffee.' })
  @IsString()
  @IsNotEmpty()
  readonly brand: string

  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly flavors: string[]
}
