import 'dotenv/config';
import { AppDataSource } from '../config/data-source';
import { seedSubscribers } from './seeders/01-subscriber.seeder';
import { seedSubscriberUsers } from './seeders/02-subscriber-users.seeder';
import { seedRiskAnalysis } from './seeders/03-risk-analysis.seeder';
import { seedScreeningConfiguration } from './seeders/03-screening-configuration.seeder';
import { seedListsManagement } from './seeders/04-lists-management.seeder';
import { seedListValues } from './seeders/05-list-values.seeder';
import { seedScreeningConfigValues } from './seeders/06-screening-config-values.seeder';
import { seedRiskConfiguration } from './seeders/07-risk-configuration.seeder';
import { seedEntities } from './seeders/08-entities.seeder';
import { seedIndividualEntities } from './seeders/09-individual-entities.seeder';
import { seedOrganizationEntities } from './seeders/10-organization-entities.seeder';

async function runSeeds() {
  await AppDataSource.initialize();
  try {
    console.log('Seeding: subscribers');
    await seedSubscribers(AppDataSource);
    console.log('Seeding: subscriber users');
    await seedSubscriberUsers(AppDataSource);
    console.log('Seeding: entities');
    await seedEntities(AppDataSource);
    console.log('Seeding: individual entities');
    await seedIndividualEntities(AppDataSource);
    console.log('Seeding: organization entities');
    await seedOrganizationEntities(AppDataSource);
    console.log('Seeding: risk analysis');
    await seedRiskAnalysis(AppDataSource);
    console.log('Seeding: screening configuration');
    await seedScreeningConfiguration(AppDataSource);
    console.log('Seeding: lists management');
    await seedListsManagement(AppDataSource);
    console.log('Seeding: list values');
    await seedListValues(AppDataSource);
    console.log('Seeding: screening config values');
    await seedScreeningConfigValues(AppDataSource);
    console.log('Seeding: risk configuration');
    await seedRiskConfiguration(AppDataSource);
    console.log('Seeding completed');
  } catch (err) {
    console.error('Seeding failed', err);
    process.exitCode = 1;
  } finally {
    await AppDataSource.destroy();
  }
}

runSeeds();