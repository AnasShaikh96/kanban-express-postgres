import expres from 'express'
import Joi from 'joi';
import { validateBody, validateParams } from '../middlewares/validate.ts';
import { idParam } from '../data/schema.ts';
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from '../controllers/userController.ts';


const router = expres.Router();

const createUserSchema = Joi.object({
    tenant_id: Joi.number().required(),
    email: Joi.string().email().required(),
    password_hash: Joi.string().required(),
    role: Joi.string().valid('admin', 'manager', 'developer')
})


router.get('/user', getAllUsers)
router.post('/user', validateBody(createUserSchema), createUser);
router.get('/user/:id', getUserById);
router.put('/user/:id', validateBody(createUserSchema), validateParams(idParam), updateUserById);
router.delete('/user/:id', deleteUserById);


export default router
