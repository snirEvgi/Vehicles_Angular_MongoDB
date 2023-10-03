import { VehiclesModel } from "../../db/models/vehicles";

export async function findVehicleById(id: string) {
    try {
        const vehicle = await VehiclesModel.findById(id);
        if (!vehicle) {
            throw new Error("Vehicle not found");
        }
        return vehicle;
    } catch (error) {
        console.error(error);
        throw error
    }
}
