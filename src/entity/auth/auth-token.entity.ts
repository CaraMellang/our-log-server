import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class AuthToken {
  @PrimaryGeneratedColumn()
  seq: number;

  @ManyToOne(() => User, (user) => user.seq)
  userSeq: number;

  @Column('varchar', { length: 1000 })
  accessToken: string;

  @Column('varchar', { length: 1000, nullable: true })
  refreshToken: string;

  updateAccessToken(updatedAccessToken: string) {
    this.accessToken = updatedAccessToken;
  }
}
