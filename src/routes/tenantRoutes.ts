import express from "express";
import { createTenant, deleteTenantById, getTenantById, updateTenantById } from "../controllers/tenantController.ts";

const router = express.Router()

router.post('/tenant', createTenant);
router.get('/tenant/:id', getTenantById);
router.put('/tenant/:id', updateTenantById);
router.delete('/tenant/:id', deleteTenantById);


export default router

