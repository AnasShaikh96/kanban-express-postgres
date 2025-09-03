import pkg from 'pg'
import config from './config.ts';

const { Pool } = pkg

const pool = new Pool({
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    port: Number(config.port),
})


pool.on('connect', () => {
    console.log('Connection Pool Established')
})


export default pool