import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserLoginHistory {
  @PrimaryGeneratedColumn()
  seq: number;

  @ManyToOne(() => User, (user) => user.seq)
  userSeq: number;

  @Column('varchar', { length: 1000, comment: '접속 유저의 브라우저 종류' })
  userAgent: string;

  @Column('varchar', { length: 50, comment: '접속유저의 IP' })
  regIp: string;

  @CreateDateColumn()
  createdAt: Date;
}
