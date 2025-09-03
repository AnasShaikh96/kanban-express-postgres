import pool from '../config/db.ts'

export const createTenantTable = async () => {

    try {

        const queryText = `
CREATE TABLE IF NOT EXISTS tenants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
        `
        const result = await pool.query(queryText);
        console.log(result)
    } catch (error) {
        console.log('error', error)
    }
}


export const createProjectsTable = async () => {
    try {

        const queryText = `
        CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER REFERENCES tenants (id),
    name VARCHAR(100),
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);
`

        const result = await pool.query(queryText);
        console.log(result)

    } catch (error) {
        console.log('error', error)
    }
}

export const createUsersTable = async () => {
    try {

        const queryText = `

CREATE TYPE IF NOT EXISTS role AS ENUM ('admin', 'manager', 'developer'); 

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER REFERENCES tenants(id),
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL,
    role role,
    created_at TIMESTAMP DEFAULT NOW()
)
    `

        const result = await pool.query(queryText);

        console.log(result)

    } catch (error) {
        console.log('error', error)
    }
}


export const createTasksTable = async () => {
    try {
        
        const queryText = `
        CREATE TYPE status AS ENUM  ('todo', 'in_progress','done');
CREATE TYPE priority AS ENUM ('low', 'medium', 'high');

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects (id),
    title VARCHAR(100),
    description VARCHAR(255),
    current_status status,
    assignee_id INTEGER REFERENCES users (id),
    due_date TIMESTAMP, 
    current_priority priority,
    parent_task_id INTEGER NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
        `

        const result = await pool.query(queryText);

        console.log(result)

    } catch (error) {
        console.log('error', error)
        
    }
}