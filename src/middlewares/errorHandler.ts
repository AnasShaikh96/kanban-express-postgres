import type { Request, Response, NextFunction } from 'express'

export class AppError extends Error {
    statusCode: number
    code?: string
    constructor(message: string, statusCode = 500, code?: string) {
        super(message)
        this.statusCode = statusCode
        if (code !== undefined) this.code = code
    }
}

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    const isAppError = err instanceof AppError
    const status = isAppError ? err.statusCode : 500
    const message = isAppError ? err.message : 'Something went wrong!'


    console.log(err)

    const details = err instanceof Error ? err.message : undefined
    res.status(status).json({
        status,
        message,
        ...(details ? { details } : {}),
    })
}