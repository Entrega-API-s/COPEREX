'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './db.js';
import { corsOptions } from './cors-configuration.js';
import { helmetConfiguration } from './helmet-configuration.js';
import { requestLimit } from '../middlewares/request-limit.js';
import { errorHandler } from '../middlewares/handle-errors.js';
import businessesRoutes from '../src/businesses/businesses.routes.js';
import reportsRoutes from '../src/reports/reports.routes.js';


const BASE_PATH = '/Coperex/v1';

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(cors(corsOptions));
    app.use(helmet(helmetConfiguration));
    app.use(requestLimit);
    app.use(morgan('dev'));
};

const routes = (app) => {


    app.use(`${BASE_PATH}/businesses`, businessesRoutes);
    app.use(`${BASE_PATH}/reports`, reportsRoutes);

    app.get(`${BASE_PATH}/status`, (req, res) => {
        res.status(200).json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            service: 'GreenCore API'
        });
    });

    app.use((req, res) => {
        res.status(404).json({
            success: false,
            message: 'Resource not found in API'
        });
    });
};

export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT;

    app.set('trust proxy', 1);

    try {
        await dbConnection();
        middlewares(app);
        routes(app);

        app.use(errorHandler);

        app.listen(PORT, () => {
            console.log(`GreenCore server running on port ${PORT}`);
            console.log(`Status check: http://localhost:${PORT}${BASE_PATH}/status`);
        });

    } catch (error) {
        console.error(`Server startup error: ${error.message}`);
        process.exit(1);
    }
};