import { VehiclesModel } from "../../db/models/vehicles";

export async function addVehicle(carData:any) {
 
    try {
        const newVehicle = new VehiclesModel(carData);
        await newVehicle.save();
        return newVehicle
    } catch (error) {
        console.error(error);
        throw error;

    }
}
