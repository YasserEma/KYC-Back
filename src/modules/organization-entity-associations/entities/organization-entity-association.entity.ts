import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { OrganizationEntity } from '../../entities/entities/organization-entity.entity';
import { IndividualEntity } from '../../entities/entities/individual-entity.entity';
import { SubscriberUserEntity } from '../../subscriber-users/entities/subscriber-user.entity';

@Entity('organization_associations')
@Index(['organization_id'])
@Index(['individual_id'])
@Index(['relationship_type'])
export class OrganizationEntityAssociationEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: false })
  organization_id: string;

  @Column({ type: 'uuid', nullable: false })
  individual_id: string;

  @Column({ type: 'text', nullable: false })
  relationship_type: string;

  @Column({ type: 'text', nullable: true })
  ownership_type: string;

  @Column({ type: 'decimal', nullable: true })
  ownership_percentage: number;

  @Column({ type: 'text', nullable: true })
  position_title: string;

  @Column({ type: 'text', nullable: true })
  association_description: string;

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
  @JoinColumn({ name: 'organization_id' })
  organization: OrganizationEntity;

  @ManyToOne(() => IndividualEntity, { eager: false })
  @JoinColumn({ name: 'individual_id' })
  individual: IndividualEntity;

  @ManyToOne(() => SubscriberUserEntity, { eager: false })
  @JoinColumn({ name: 'created_by' })
  createdBy: SubscriberUserEntity;

  @ManyToOne(() => SubscriberUserEntity, { eager: false })
  @JoinColumn({ name: 'verified_by' })
  verifiedBy: SubscriberUserEntity;
}