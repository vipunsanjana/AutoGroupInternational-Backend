import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
{
    requestedBy: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehicleGeneration: { type: String, required: true },
    system: { type: String },
    type: { type: String, enum: ['Apparatus', 'Jig', 'Template', 'Mold', 'Part'], required: true },
    description: { type: String, required: true },
    parentPartNumber: { type: String },
    currentPartNumber: { type: String },
    currentDrawingNumber: { type: String },
    updatedPartNumber: { type: String },
    updatedDrawingNumber: { type: String },
    status: { type: String },
    
},{ timestamps: true });

export default mongoose.model("requests", requestSchema);

