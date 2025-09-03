import express from "express";
import cors from "cors"
import config from "./config/config.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import tenantRoutes from './routes/tenantRoutes.ts'
import pool from "./config/db.ts";

const app = express();

app.use(express.json());
app.use(cors());

// DB CONNECTION
app.use('/', async (req, res) => {
    const result = await pool.query('SELECT current_database()');
    res.status(200).send(`Your db details are ${result.rows[0].current_database}`)
})

// MIDDLEWARES

// ROUTES
app.use('/api', tenantRoutes)

// ERROR HANDLING
app.use(errorHandler)


app.listen(config.port, () => {
    console.log('Server is up on :', config.port)
})