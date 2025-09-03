import pool from "../config/db.ts"


export const getAllTenantService = async () => {
    const result = await pool.query(`SELECT * FROM tenants`);
    return result.rows[0]
}


export const createTenantService = async (name, plan) => {
    const result = await pool.query('INSERT INTO tenants (name, current_plan) VALUES ($1, $2) RETURNING *', [name, plan]);
    return result.rows[0]
}

export const getTenantService = async (id) => {
    const result = await pool.query(`SELECT * FROM tenants WHERE id=$1`, [id]);
    return result.rows[0]
}


export const updateTenantService = async (name, plan, id) => {
    const result = await pool.query(`UPDATE tenants SET name=$1, current_plan=$2 WHERE id=$3 RETURNING *`, [name, plan, id]);
    return result.rows[0]
}


export const deleteTenantService = async (id) => {
    const result = await pool.query(`DELETE FROM tenants WHERE id=$1`, [id]);
    return result.rows[0]
}