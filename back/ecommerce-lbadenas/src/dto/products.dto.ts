import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(50)
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;
}
