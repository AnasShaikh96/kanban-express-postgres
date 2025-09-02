import express from "express";
import { createTenant } from "../controllers/tenantController.ts";

const router = express.Router()

router.post('/tenant', createTenant);
// router.get('/tenant/:id', getTenantById);
// router.put('/tenant/:id', updateTenantById);
// router.post('/tenant/:id', deleteTenantById);


export default router

