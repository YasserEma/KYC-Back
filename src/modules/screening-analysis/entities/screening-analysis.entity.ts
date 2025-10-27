import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { EntityEntity } from '../../entities/entities/entity.entity';
import { SubscriberUserEntity } from '../../subscriber-users/entities/subscriber-user.entity';

@Entity('screening_analysis')
@Index(['entity_id'])
@Index(['screening_date'])
@Index(['screening_status'])
export class ScreeningAnalysisEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  entity_id!: string;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  screening_date!: Date;

  @Column({ type: 'text' })
  screening_source!: string;

  @Column({ type: 'jsonb', nullable: true })
  matched_records?: any;

  @Column({ type: 'decimal', nullable: true })
  best_match_score?: number;

  @Column({ type: 'text' })
  screening_status!: string;

  @Column({ type: 'uuid', nullable: true })
  reviewer_id?: string;

  @Column({ type: 'text', nullable: true })
  review_decision?: string;

  @Column({ type: 'text', nullable: true })
  review_notes?: string;

  @Column({ type: 'timestamp', nullable: true })
  reviewed_at?: Date;

  @Column({ type: 'uuid' })
  created_by!: string;

  // Relationships
  @ManyToOne(() => EntityEntity, entity => entity.screeningAnalyses)
  @JoinColumn({ name: 'entity_id' })
  entity: EntityEntity;

  @ManyToOne(() => SubscriberUserEntity)
  @JoinColumn({ name: 'created_by' })
  creator: SubscriberUserEntity;

  @ManyToOne(() => SubscriberUserEntity)
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: SubscriberUserEntity;
}