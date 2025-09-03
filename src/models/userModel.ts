import pool from "../config/db.ts";

export type User = {
    id?: number
    tenant_id: number
    email: string
    password_hash: string
    role: 'admin' | 'manager' | 'developer'
}


export const getAllUserService = async (): Promise<User[]> => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows
}


export const createUserService = async (tenant_id: number, email: string, password_hash: string, role: string): Promise<User> => {

    const result = await pool.query('INSERT INTO users (tenant_id, email,password_hash, role) VALUES ($1,$2,$3,$4) RETURNING *', [tenant_id, email, password_hash, role])

    return result.rows[0]
}

export const getUserService = async (id?: string): Promise<User> => {
    const result = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
    return result.rows[0];
}

export const updateUserService = async (
    tenant_id: number, email: string, password_hash: string, role: string,
    id?: string): Promise<User> => {
    const result = await pool.query('UPDATE users SET tenant_id=$1, email=$2, password_hash=$3, role=$4 WHERE id=$5 RETURNING *', [tenant_id, email, password_hash, role, id]);
    return result.rows[0];
}


export const partialUpdateUserService = async (
    id?: string,
    updates?: Partial<Pick<User, "tenant_id" | "email" | "password_hash" | "role">>
): Promise<User> => {
    const setClauses: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const [key, value] of Object.entries(updates ?? [])) {
        setClauses.push(`${key}=$${idx}`);
        values.push(value);
        idx++;
    }

    if (setClauses.length === 0) {
        throw new Error("No fields provided to update");
    }

    values.push(id);


    console.log(``)

    const query = `
      UPDATE users
      SET ${setClauses.join(", ")}
      WHERE id=$${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
};

export const deleteUserService = async (id?: string): Promise<User> => {
    const result = await pool.query('DELETE FROM users WHERE id=$1', [id]);
    return result.rows[0];
}



