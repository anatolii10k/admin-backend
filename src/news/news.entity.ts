import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class News extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  artLink: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
