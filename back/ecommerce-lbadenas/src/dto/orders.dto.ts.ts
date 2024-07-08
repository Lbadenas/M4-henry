import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from 'src/entities/products.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: 'El ID del usuario que realiza el pedido, debe ser un UUID.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description:
      'Una lista de productos incluidos en el pedido. Debe contener al menos un producto.',
    example: [
      { id: 'c0ffee22-bada-4711-83e7-92b2dbf3c2c6' },
      { id: 'f00dbabe-dead-beef-8bad-0ff1ce0000c0' },
    ],
    type: Array,
    items: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'c0ffee22-bada-4711-83e7-92b2dbf3c2c6' },
      },
    },
  })
  @IsArray()
  @ArrayMinSize(1)
  Products: Partial<Products[]>;
}
