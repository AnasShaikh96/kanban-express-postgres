import type { NextFunction } from "express"
import { createTenantService, deleteTenantService, getTenantService, updateTenantService } from "../models/tenantModel.ts"

const handleResponse = (res: Response, status: number, message: string, data: any = null) => {
    return res.status(status).json({
        status,
        message,
        data
    })
}



export const createTenant = async (req: Request, res: Response, next: NextFunction) => {

    const { name, plan } = req.body
    try {
        const newUser = await createTenantService(name, plan)
        handleResponse(res, 201, 'Tenant Created Succesfully', newUser)

    } catch (error) {
        next(error)
    }
}

export const getTenantById = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params
    try {
        const tenant = await getTenantService(id);

        if (!tenant) {
            res.status(404).json({
                status: 404,
                message: 'Tenant not found.'
            })
        }

        handleResponse(res, 200, 'Tenant fetched Succesfully', tenant)

    } catch (error) {
        next(error)
    }
}

export const updateTenantById = async (req: Request, res: Response, next: NextFunction) => {

    const { name, plan } = req.body;
    const { id } = req.params
    try {
        const updateTenant = await updateTenantService(name, plan, id);

        if (!updateTenant) {
            res.status(404).json({
                status: 404,
                message: 'Tenant not found.'
            })
        }

        handleResponse(res, 200, 'Tenant updated Succesfully', updateTenant)

    } catch (error) {
        next(error)
    }
}

export const deleteTenantById = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params
    try {
        const tenant = await deleteTenantService(id);

        // if (!tenant) {
        //     res.status(404).json({
        //         status: 404,
        //         message: 'Tenant not found.'
        //     })
        // }

        handleResponse(res, 200, 'Tenant deleted Succesfully', tenant)

    } catch (error) {
        next(error)
    }
}