import type { NextFunction } from "express"

const handleResponse = (res: Response, status: number, message: string, data:any = null  ) => {
 return   res.status(status).json({
        status,
        message,
        data
    })
}



export const createTenant = async (req: Request, res: Response, next: NextFunction) => {

    const { name, plan, created_at } = req.body

    try {

        handleResponse(res, 201, 'Tenant Created Succesfully', [])

    } catch (error) {

        next(error)
    }

}