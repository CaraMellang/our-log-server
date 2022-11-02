import { IsDate } from 'class-validator';
import {
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  seq: number;

  @OneToOne(() => User, (User) => User.seq)
  ownerSeq: number;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
