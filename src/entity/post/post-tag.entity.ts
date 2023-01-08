import { IsDate } from 'class-validator';
import { YN } from 'src/common/types/constant/constant';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class PostTag {
  @PrimaryGeneratedColumn()
  seq: number;

  @Column({ comment: '태그의 이름' })
  tagName: string;

  @Column({ comment: '태그의 사용 상태' })
  status: YN;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
