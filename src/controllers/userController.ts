import type { NextFunction, Request, Response } from "express";
import { createUserService, deleteUserService, getAllUserService, getUserService, updateUserService } from "../models/userModel.ts";
import { sendResponse } from "../utils/response.ts";
import { AppError } from "../middlewares/errorHandler.ts";



export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const allUsers = await getAllUserService();
        sendResponse(res, 200, 'All Users fetched Successfully', allUsers)

    } catch (error) {
        next(error)
    }

}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const { tenant_id, email, role, password_hash } = req.body

    try {
        const user = await createUserService(tenant_id, email, password_hash, role,);
        sendResponse(res, 201, 'User Created Successfully!', user);

    } catch (error) {
        next(error)
    }
}


export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {

        const user = await getUserService(id);
        if (!user) return next(new AppError('User not found.', 404))
        sendResponse(res, 200, 'User fetched successfully', user);

    } catch (error) {
        next(error)
    }
}

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { tenant_id, email, role, password_hash } = req.body

    try {

        const updateUser = await updateUserService(tenant_id, email, password_hash, role, id);
        // if (!updateUser) return next(new AppError('User not found.', 404))
        sendResponse(res, 200, 'User updated successfully', updateUser);

    } catch (error) {
        next(error)
    }
}


export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {

        const updateUser = await deleteUserService(id);
        // if (!updateUser) return next(new AppError('User not found.', 404))
        sendResponse(res, 200, 'User deleted successfully', updateUser);

    } catch (error) {
        next(error)
    }
}
