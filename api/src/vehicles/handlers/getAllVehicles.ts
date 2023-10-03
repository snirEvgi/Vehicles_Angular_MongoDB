import { VehiclesModel } from "../../db/models/vehicles"


export async function getAllVehicles (query:any) {
    try {
        const { hp, acc,weight,limit,name,mpg,price } = query
        const hpCriteria = hp ? { Horsepower: { $gt: Number(hp) } } : {}
        const accCriteria = acc ? { Acceleration: { $gt: Number(acc) } } : {}
        const weightCriteria = weight ? { Weight_in_lbs: { $gt: Number(weight) } } : {}
        const nameCriteria = name ? { Name : name }  : {}
        const mpgCriteria = mpg ? { Miles_per_Gallon: { $gt: Number(mpg) } } : {}
        const priceCriteria = price ? { price: { $lt: Number(price) } } : {}
        const result = await VehiclesModel.find({...hpCriteria, ...accCriteria,...weightCriteria,...nameCriteria,...mpgCriteria,...priceCriteria},{ __v: 0 }).limit(Number(limit)||25);
        return result
    } catch (error) {
        console.log(error);
        throw error;
    }
};