import type { Request, Response, NextFunction } from 'express'
import type { ObjectSchema } from 'joi'

export const validateBody = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true })
        if (error) {
            return res.status(400).json({
                status: 400,
                message: 'Validation error',
                details: error.details.map(d => d.message),
            })
        }
        req.body = value
        next()
    }
}

export const validateParams = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.params, { abortEarly: false, stripUnknown: true })
        if (error) {
            return res.status(400).json({
                status: 400,
                message: 'Validation error',
                details: error.details.map(d => d.message),
            })
        }
        req.params = value as any
        next()
    }
}


