import pool from "../config/db.ts"

export type Tenant = {
    id: number
    name: string
    current_plan: 'free' | 'pro' | 'enterprise' | null
    created_at: string
}

export const createTenantService = async (name: string, plan: string): Promise<Tenant> => {
    const result = await pool.query<Tenant>('INSERT INTO tenants (name, current_plan) VALUES ($1, $2) RETURNING *', [name, plan]);
    return result.rows[0] as Tenant
}

export const getTenantService = async (id: string): Promise<Tenant | undefined> => {
    const result = await pool.query<Tenant>(`SELECT * FROM tenants WHERE id=$1`, [id]);
    return result.rows[0]
}

export const updateTenantService = async (name: string, plan: string, id: string): Promise<Tenant | undefined> => {
    const result = await pool.query<Tenant>(`UPDATE tenants SET name=$1, current_plan=$2 WHERE id=$3 RETURNING *`, [name, plan, id]);
    return result.rows[0] as Tenant | undefined
}

export const deleteTenantService = async (id: string): Promise<{ rowCount: number }> => {
    const result = await pool.query(`DELETE FROM tenants WHERE id=$1`, [id]);
    const rowCount = (result as any).rowCount ?? 0
    return { rowCount }
}