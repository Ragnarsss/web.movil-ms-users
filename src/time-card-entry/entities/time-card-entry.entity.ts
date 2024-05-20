import { User } from 'src/users/entities/user.entity';
import { TimeCard } from '../../time-card/entities/time-card.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('time_card_entries')
export class TimeCardEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TimeCard, (timeCard) => timeCard.entries)
  @JoinColumn({ name: 'time_card_id' }) // Aquí especificamos la columna de unión
  timeCard: TimeCard;

  @Column()
  date: Date;

  @Column({ nullable: true })
  morning_start: Date;

  @Column({ nullable: true })
  morning_end: Date;

  @Column({ nullable: true })
  afternoon_start: Date;

  @Column({ nullable: true })
  afternoon_end: Date;

  @Column({ nullable: true })
  overtime_start: Date;

  @Column({ nullable: true })
  overtime_end: Date;

  @Column({ nullable: true })
  total_hours: number;
}
