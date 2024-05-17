import { TimeCardEntry } from '../../time-card-entry/entities/time-card-entry.entity';
import { User } from '../../users/entities/user.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('time_cards')
export class TimeCard {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.timeCards)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  period_start: Date;

  @Column()
  period_end: Date;

  @OneToMany(() => TimeCardEntry, (entry) => entry.timeCard)
  entries: TimeCardEntry[];
}
