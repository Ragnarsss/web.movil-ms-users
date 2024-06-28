import { TimeCard } from '../../time-card/entities/time-card.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
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
  entry: Date;

  @Column({ nullable: true })
  exit: Date;
}
