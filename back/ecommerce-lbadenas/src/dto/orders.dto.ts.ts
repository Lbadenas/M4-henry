import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  isUUID,
} from 'class-validator';
import { Products } from 'src/entities/products.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;
  @IsArray()
  @ArrayMinSize(1)
  Products: Partial<Products[]>;
}
