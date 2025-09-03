import express from "express";
import { createTenant, deleteTenantById, getTenantById, updateTenantById } from "../controllers/tenantController.ts";
import { validateBody, validateParams } from "../middlewares/validate.ts";
import Joi from 'joi'

const router = express.Router()

const createTenantBody = Joi.object({
  name: Joi.string().min(3).required(),
  plan: Joi.string().valid('free', 'pro', 'enterprise').required(),
})

const idParam = Joi.object({
  id: Joi.number().integer().positive().required(),
})

router.post('/tenants', validateBody(createTenantBody), createTenant);
router.get('/tenants/:id', validateParams(idParam), getTenantById);
router.put('/tenants/:id', validateParams(idParam), validateBody(createTenantBody), updateTenantById);
router.delete('/tenants/:id', validateParams(idParam), deleteTenantById);


export default router

