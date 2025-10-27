import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { SubscriberEntity } from '../../subscribers/entities/subscriber.entity';
import { SubscriberUserEntity } from '../../subscriber-users/entities/subscriber-user.entity';

@Entity('screening_configuration')
@Index(['config_profile_id'])
@Index(['subscriber_id'])
@Index(['entity_type'])
@Index(['subscriber_id', 'configuration_name'], { unique: true })
export class ScreeningConfigurationEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  @Index()
  config_profile_id: string;

  @Column({ type: 'uuid' })
  @Index()
  subscriber_id: string;

  @Column({ type: 'text' })
  @Index()
  entity_type: string;

  @Column({ type: 'text' })
  configuration_name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  is_default: boolean;

  @Column({ type: 'uuid' })
  created_by: string;

  @Column({ type: 'uuid', nullable: true })
  updated_by: string;

  // Relationships
  @ManyToOne(() => SubscriberEntity)
  @JoinColumn({ name: 'subscriber_id' })
  subscriber: SubscriberEntity;

  @ManyToOne(() => SubscriberUserEntity)
  @JoinColumn({ name: 'created_by' })
  creator: SubscriberUserEntity;

  @ManyToOne(() => SubscriberUserEntity)
  @JoinColumn({ name: 'updated_by' })
  updater: SubscriberUserEntity;
}