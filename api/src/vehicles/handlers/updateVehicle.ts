import { Request, Response } from "express";
import { VehiclesModel } from "../../db/models/vehicles";

export async function updateVehicle(id:string, updateData:any) {
    try {
        
        const updatedVehicle = await VehiclesModel.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!updatedVehicle) {
            throw new Error("Vehicle not found");
        }
        return updatedVehicle
    } catch (error) {
        console.error(error);
        throw error
    }
}
