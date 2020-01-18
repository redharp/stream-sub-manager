// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Subscription {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  service: string;

  @Column()
  lastFour: string;

  @Column()
  isActive: boolean;

  @Column({ type: 'date' })
  renewal: Date;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

}
