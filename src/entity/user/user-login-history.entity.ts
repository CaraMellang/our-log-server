import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserLoginHistory {
  @PrimaryGeneratedColumn()
  seq: number;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn()
  user: User;

  @Column('varchar', { length: 1000, comment: '접속 유저의 브라우저 종류' })
  userAgent: string;

  @Column('varchar', { length: 50, comment: '접속유저의 IP' })
  regIp: string;

  @Column({
    default: false,
    comment:
      '로그인 방식입니다. 토큰 로그인 유지로 사이트에 첫 진입시 true, 로그인 페이지에서 로그인 후 접근시 false 입니다. 1 === true , 0 === false ',
  })
  isAutoVerify: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
