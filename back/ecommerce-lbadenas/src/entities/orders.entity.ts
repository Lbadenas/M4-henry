import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { OrderDetails } from './orderdetails.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'ORDERS' })
export class Orders {
  @ApiProperty({
    description: 'Uuid v4 generado por la BBDD',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Debe ingresar una fecha con formato dd/mm/yy',
    example: '08/07/2024',
  })
  @Column()
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails;

  @ManyToOne(() => Users, () => (user) => user.orders)
  @JoinColumn()
  user: Users;
}
