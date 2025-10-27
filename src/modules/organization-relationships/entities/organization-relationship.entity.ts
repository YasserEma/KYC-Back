import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { OrganizationEntity } from '../../entities/entities/organization-entity.entity';
import { SubscriberUserEntity } from '../../subscriber-users/entities/subscriber-user.entity';

@Entity('organization_relationships')
@Index(['primary_organization_id'])
@Index(['related_organization_id'])
@Index(['relationship_type'])
export class OrganizationRelationshipEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: false })
  primary_organization_id: string;

  @Column({ type: 'uuid', nullable: false })
  related_organization_id: string;

  @Column({ type: 'text', nullable: false })
  relationship_type: string;

  @Column({ type: 'decimal', nullable: true })
  ownership_percentage: number;

  @Column({ type: 'text', nullable: true })
  relationship_description: string;

  @Column({ type: 'date', nullable: false })
  effective_from: Date;

  @Column({ type: 'date', nullable: true })
  effective_to: Date;

  @Column({ type: 'boolean', nullable: false, default: false })
  verified: boolean;

  @Column({ type: 'uuid', nullable: true })
  verified_by: string;

  @Column({ type: 'timestamp', nullable: true })
  verified_at: Date;

  @Column({ type: 'uuid', nullable: false })
  created_by: string;

  // Relationships
  @ManyToOne(() => OrganizationEntity, { eager: false })
  @JoinColumn({ name: 'primary_organization_id' })
  primary_organization: OrganizationEntity;

  @ManyToOne(() => OrganizationEntity, { eager: false })
  @JoinColumn({ name: 'related_organization_id' })
  related_organization: OrganizationEntity;

  @ManyToOne(() => SubscriberUserEntity, { eager: false })
  @JoinColumn({ name: 'created_by' })
  createdBy: SubscriberUserEntity;

  @ManyToOne(() => SubscriberUserEntity, { eager: false })
  @JoinColumn({ name: 'verified_by' })
  verifiedBy: SubscriberUserEntity;
}