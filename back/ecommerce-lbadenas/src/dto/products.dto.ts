import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    description:
      'El nombre del producto, debe ser un string con un máximo de 50 caracteres.',
    example: 'Producto de ejemplo',
  })
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description:
      'La descripción del producto, debe ser un string con un máximo de 50 caracteres.',
    example: 'Esta es una descripción de ejemplo para un producto.',
  })
  @IsString()
  @MaxLength(50)
  description: string;

  @ApiProperty({
    description: 'El precio del producto, debe ser un número.',
    example: 99.99,
    type: Number,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'El stock del producto, debe ser un número.',
    example: 100,
    type: Number,
  })
  @IsNumber()
  stock: number;
}
