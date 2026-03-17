'use strict';

import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('Database | connection error detected');
            mongoose.disconnect();
        });

        mongoose.connection.on('connecting', () => {
            console.log('Database | establishing connection...');
        });

        mongoose.connection.on('connected', () => {
            console.log('Database | successfully connected');
        });

        mongoose.connection.on('open', () => {
            console.log('Database | connection ready: greenDB');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('Database | reconnected successfully');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Database | connection lost');
        });

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10
        });

    } catch (error) {
        console.log(`Database connection failed: ${error}`);
    }
};

const gracefulShutdown = async (signal) => {
    console.log(`Database | ${signal} received, closing connection...`);
    try {
        await mongoose.connection.close();
        console.log('Database | connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Database | shutdown error:', error.message);
        process.exit(1);
    }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2'));