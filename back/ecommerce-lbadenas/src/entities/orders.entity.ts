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

@Entity({ name: 'ORDERS' })
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails;

  @ManyToOne(() => Users, () => (user) => user.orders)
  @JoinColumn()
  user: Users;
}
