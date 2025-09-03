import express from "express";
import cors from "cors"
import config from "./config/config.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import tenantRoutes from './routes/tenantRoutes.ts'
import userRoutes from './routes/userRoutes.ts'
import { dbHealthCheck } from "./config/db.ts";

const app = express();

app.use(express.json());
app.use(cors());


// MIDDLEWARES

// ROUTES
app.use('/api/v1', tenantRoutes)
app.use('/api/v1', userRoutes)

// HEALTH
app.get('/health', async (req, res) => {
    const dbOk = await dbHealthCheck();
    res.status(dbOk ? 200 : 503).json({ status: dbOk ? 'ok' : 'degraded' });
})

// ERROR HANDLING
app.use(errorHandler)

app.listen(config.port, () => {
    console.log('Server is up on :', config.port)
})