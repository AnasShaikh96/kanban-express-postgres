CREATE TYPE plan AS ENUM ('free', 'pro', 'enterprise');

CREATE TABLE IF NOT EXISTS tenants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    current_plan plan,
    created_at TIMESTAMP DEFAULT NOW()
)




CREATE TYPE role AS ENUM ('admin', "manager", 'developer'); 

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER REFERENCES tenants (id),
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL,
    current_role role,
    created_at TIMESTAMP DEFAULT NOW(),
)



CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER REFERENCES tenants (id),
    name VARCHAR(100),
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
)


CREATE TYPE status AS ENUM  ('todo', 'in_progress','done');
CREATE TYPE priority AS ENUM ('low', 'medium', 'high');

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects (id),
    title VARCHAR(100),
    description VARCHAR(255),
    current_status status,
    assignee_id INTEGER REFERENCES users (id),
    due_date DATETIME, 
    current_priority priority,
    parent_task_id NULL,
    created_at TIMESTAMP DEFAULT NOW()
)