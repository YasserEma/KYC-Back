import { AppDataSource } from './src/config/data-source';

async function verifySeededData() {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');

    // Check all tables for seeded data
    const tables = [
      'subscribers',
      'subscriber_users', 
      'screening_configuration',
      'lists_management',
      'list_values',
      'screening_config_values',
      'risk_configuration'
    ];

    console.log('\n=== Seeded Data Verification ===\n');

    for (const table of tables) {
      try {
        const result = await AppDataSource.query(`SELECT COUNT(*) as count FROM ${table}`);
        const count = parseInt(result[0].count);
        console.log(`${table.padEnd(25)} : ${count} records`);
      } catch (error) {
        console.log(`${table.padEnd(25)} : ERROR - ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    // Check relationships
    console.log('\n=== Relationship Verification ===\n');

    // Check subscriber_users -> subscribers relationship
    try {
      const userSubscriberCheck = await AppDataSource.query(`
        SELECT COUNT(*) as count 
        FROM subscriber_users su 
        JOIN subscribers s ON su.subscriber_id = s.id
      `);
      console.log(`subscriber_users with valid subscribers: ${userSubscriberCheck[0].count}`);
    } catch (error) {
      console.log(`subscriber_users relationship check: ERROR - ${error instanceof Error ? error.message : String(error)}`);
    }

    // Check list_values -> lists_management relationship
    try {
      const listValuesCheck = await AppDataSource.query(`
        SELECT COUNT(*) as count 
        FROM list_values lv 
        JOIN lists_management lm ON lv.list_id = lm.id
      `);
      console.log(`list_values with valid lists: ${listValuesCheck[0].count}`);
    } catch (error) {
      console.log(`list_values relationship check: ERROR - ${error instanceof Error ? error.message : String(error)}`);
    }

    // Check risk_configuration -> subscribers relationship
    try {
      const riskConfigCheck = await AppDataSource.query(`
        SELECT COUNT(*) as count 
        FROM risk_configuration rc 
        JOIN subscribers s ON rc.subscriber_id = s.id
      `);
      console.log(`risk_configuration with valid subscribers: ${riskConfigCheck[0].count}`);
    } catch (error) {
      console.log(`risk_configuration relationship check: ERROR - ${error instanceof Error ? error.message : String(error)}`);
    }

    console.log('\n=== Verification Complete ===\n');

  } catch (error) {
    console.error('Error during verification:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

verifySeededData();