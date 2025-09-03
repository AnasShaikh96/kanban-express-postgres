import type { Request, Response, NextFunction } from "express"
import { createTenantService, deleteTenantService, getTenantService, updateTenantService } from "../models/tenantModel.ts"
import { AppError } from "../middlewares/errorHandler.ts"
import { sendResponse } from "../utils/response.ts"

const handleResponse = sendResponse



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

    const { id } = req.params as { id: string }
    try {
        const tenant = await getTenantService(id);

        if (!tenant) return next(new AppError('Tenant not found.', 404))

        handleResponse(res, 200, 'Tenant fetched Succesfully', tenant)

    } catch (error) {
        next(error)
    }
}

export const updateTenantById = async (req: Request, res: Response, next: NextFunction) => {

    const { name, plan } = req.body as { name: string; plan: string };
    const { id } = req.params as { id: string }
    try {
        const updateTenant = await updateTenantService(name, plan, id);

        if (!updateTenant) return next(new AppError('Tenant not found.', 404))

        handleResponse(res, 200, 'Tenant updated Succesfully', updateTenant)

    } catch (error) {
        next(error)
    }
}

export const deleteTenantById = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params as { id: string }
    try {
        const result = await deleteTenantService(id);
        if (result.rowCount === 0) return next(new AppError('Tenant not found.', 404))

        handleResponse(res, 200, 'Tenant deleted Succesfully')

    } catch (error) {
        next(error)
    }
}