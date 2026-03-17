'use strict'

import mongoose from "mongoose";

const businessSchema = mongoose.Schema(
    {
        businessName: {
            type: String,
            required: [true, "Business name is required"]
        },
        sector: {
            type: String,
            required: [true, "Sector is required"]
        },
        impactScore: {
            type: String,
            required: true,
            enum: {
                values: ["LOW", "MEDIUM", "HIGH"],
                message: "Impact score must be LOW, MEDIUM or HIGH"
            }
        },
        experienceYears: {
            type: Number,
            required: true,
            min: 0
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

businessSchema.index({ impactScore: 1 });

export default mongoose.model('Business', businessSchema);