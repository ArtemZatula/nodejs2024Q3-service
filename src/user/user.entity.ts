import { compare, hash } from 'bcrypt';
import { getSaltRounds } from 'src/helpers/env';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @VersionColumn({ default: 1 })
  version: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  async validatePassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, getSaltRounds());
  }
}
