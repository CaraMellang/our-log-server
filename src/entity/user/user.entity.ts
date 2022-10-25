import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  seq: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  username: string;

  //   @Column({ nullable: true })
  //   phone: string;

  //   @Column({ nullable: true })
  //   smsYn: string;
}
