import pkg from 'pg'
import config from './config.ts';

const { Pool } = pkg

const pool = new Pool({
    user: config.database.user,
    host: config.database.host,
    database: config.database.database,
    password: config.database.password,
    port: config.database.port,
})

pool.on('connect', () => {
    console.log('Connection Pool Established')
})

export const dbHealthCheck = async (): Promise<boolean> => {
    try {
        await pool.query('SELECT 1');
        return true;
    } catch {
        return false;
    }
}

export default pool