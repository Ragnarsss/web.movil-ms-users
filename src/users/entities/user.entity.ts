import { TimeCard } from '../../time-card/entities/time-card.entity';

import { Exclude } from 'class-transformer';
import { roles } from '../../common/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  jwt: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  refreshToken: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', unique: true, length: 255 })
  userName: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'enum', enum: roles, default: roles.WORKER })
  role: roles;

  @OneToMany(() => TimeCard, (timeCard) => timeCard.user)
  timeCards: TimeCard[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
