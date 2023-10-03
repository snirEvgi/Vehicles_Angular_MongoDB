import express, { Request, Response, NextFunction } from "express"
import { getAllVehicles } from "./handlers/getAllVehicles";
import { addVehicle } from "./handlers/addVehicle";
import { updateVehicle } from "./handlers/updateVehicle";
import { deleteVehicle } from "./handlers/removeVehicle";
import { findVehicleById } from "./handlers/findVehicleById";
const vehiclesRouter = express.Router();
vehiclesRouter.get("/", getAllVehiclesApi)
vehiclesRouter.post("/newVehicle", addNewVehicleApi)
vehiclesRouter.put("/updateVehicle/:id", updateVehicleApi)
vehiclesRouter.delete("/remove/:id", removeVehicleApi)
vehiclesRouter.get("/find/:id", findVehicleByIdApi)
async function getAllVehiclesApi(req: Request, res: Response, next: NextFunction) {
    try {
        const query = req?.query;
        const result = await getAllVehicles(query)
        res.json(result);
    } catch (error) {
        console.log(error,"error fetching data");
        return next(error)
    }
}
async function addNewVehicleApi(req: Request, res: Response, next: NextFunction) {
    try {
        const carData = req?.body;
        const result = await addVehicle(carData)
        res.json(result);
    } catch (error) {
        console.log(error,"error adding data");
        return next(error)
    }
}
async function updateVehicleApi(req: Request, res: Response, next: NextFunction) {
    try {

        const {id }= req?.params;
        const carData = req?.body;
        const result = await updateVehicle(id,carData)
        res.json(result);
    } catch (error) {
        console.log(error,"error updating data");
        return next(error)
    }
}
async function removeVehicleApi(req: Request, res: Response, next: NextFunction) {
    try {
        const {id }= req?.params;
        const result = await deleteVehicle(id)
        res.json(result);
    } catch (error) {
        console.log(error,"error deleting data");
        return next(error)
    }
}
async function findVehicleByIdApi(req: Request, res: Response, next: NextFunction) {
    try {
        const {id }= req?.params;
        const result = await findVehicleById(id)
        res.json(result);
    } catch (error) {
        console.log(error,"error finding data");
        return next(error)
    }
}

export { vehiclesRouter };
