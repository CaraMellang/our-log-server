import { Exclude } from 'class-transformer';
import { IsDate, IsEmail } from 'class-validator';
import { YN } from 'src/common/types/constant/constant';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthToken } from '../auth/auth-token.entity';

@Entity()
export class User {
  @OneToMany(() => AuthToken, (authToken) => authToken.userSeq)
  @PrimaryGeneratedColumn()
  seq: number;

  @Column({ nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  @IsEmail()
  email: string;

  @Exclude()
  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: true })
  phone: string;

  // @OneToOne(()=>Blog , blog.user)
  // blog:Blog

  @Column({ nullable: true })
  smsYn: YN;

  @Column({ default: 'user' })
  role: string;

  // @Column()
  // roles: string[];

  @Column({ default: '' })
  githubHref: string;

  @Column({ default: '' })
  facebookHref: string;

  @Column({ default: '' })
  instagramHref: string;

  @Column({ default: null })
  socialId: string | null;

  @Column({ default: 'local' })
  provider: string;

  @Column({ default: 1 })
  status: 1 | -1;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
