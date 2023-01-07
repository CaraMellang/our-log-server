import { IsDate } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  seq: number;

  @OneToOne(() => User, (user) => user, { onDelete: 'CASCADE' })
  @JoinColumn()
  owner: User;

  @Column()
  blogTitle: string;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
