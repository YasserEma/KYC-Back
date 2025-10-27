import { Entity, Column, ManyToOne, JoinColumn, Index, CreateDateColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { EntityEntity } from '../../entities/entities/entity.entity';
import { SubscriberUserEntity } from '../../subscriber-users/entities/subscriber-user.entity';

@Entity('risk_analysis')
@Index(['entity_id'])
@Index(['analysis_date'])
@Index(['risk_level'])
export class RiskAnalysisEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: false })
  entity_id: string;

  @Column({ type: 'timestamp', nullable: false, default: () => 'NOW()' })
  analysis_date: Date;

  @Column({ type: 'text', nullable: false })
  risk_level: string;

  @Column({ type: 'decimal', nullable: true })
  risk_score: number;

  @Column({ type: 'jsonb', nullable: true })
  risk_factors: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  mitigation_actions: Record<string, any>;

  @Column({ type: 'uuid', nullable: true })
  analyst_id: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'uuid', nullable: true })
  created_by: string;

  // Relationships
  @ManyToOne(() => EntityEntity, entity => entity.riskAnalyses)
  @JoinColumn({ name: 'entity_id' })
  entity: EntityEntity;

  @ManyToOne(() => SubscriberUserEntity)
  @JoinColumn({ name: 'analyst_id' })
  analyst: SubscriberUserEntity;

  @ManyToOne(() => SubscriberUserEntity)
  @JoinColumn({ name: 'created_by' })
  createdBy: SubscriberUserEntity;
}