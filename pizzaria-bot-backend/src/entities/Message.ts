import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  role!: 'user' | 'bot';

  @Column('text')
  content!: string;

  @CreateDateColumn()
  created_at!: Date;
}