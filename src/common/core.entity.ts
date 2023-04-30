import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
