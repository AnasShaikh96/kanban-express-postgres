import Joi, { required } from "joi";


export const tenantSchema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(3).required(),
    current_plan: Joi.string().valid('free', 'pro', 'enterprise'),
    created_at: Joi.date()
})

export const usersSchema = Joi.object({
    id: Joi.number(),
    tenant_id: Joi.number().required(),
    email: Joi.string().email().required(),
    password_hash: Joi.string().required(),
    current_role: Joi.string().valid('admin', 'manager', 'developer')
})


export const projectSchema = Joi.object({
    id: Joi.number().integer().positive(), // usually auto-generated
    tenant_id: Joi.number().integer().positive().required(),
    name: Joi.string().max(100).required(),
    description: Joi.string().max(255).allow(null, ""),
    created_at: Joi.date() // default NOW()
});

export const taskSchema = Joi.object({
    id: Joi.number().integer().positive(), // auto-generated
    project_id: Joi.number().integer().positive().required(),
    title: Joi.string().max(100).required(),
    description: Joi.string().max(255).allow(null, ""),
    current_status: Joi.string().valid("todo", "in_progress", "done").required(),
    assignee_id: Joi.number().integer().positive().allow(null),
    due_date: Joi.date().allow(null),
    current_priority: Joi.string().valid("low", "medium", "high").required(),
    parent_task_id: Joi.number().integer().positive().allow(null),
    created_at: Joi.date() // default NOW()
});