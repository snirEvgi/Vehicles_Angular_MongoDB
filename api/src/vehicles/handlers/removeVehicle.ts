import { VehiclesModel } from "../../db/models/vehicles";

export async function deleteVehicle(id: string) {
    try {

        const deletedVehicle = await VehiclesModel.findByIdAndDelete(id);
        if (!deletedVehicle) {
            throw new Error("Vehicle not found");
        }
        return deletedVehicle
    } catch (error) {
        console.error(error);
        throw error
    }
}
