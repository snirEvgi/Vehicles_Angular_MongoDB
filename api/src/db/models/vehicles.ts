import mongoose from "mongoose"

const { Schema } = mongoose

const VehiclesSchemaModel = new Schema({
    Name: String,
    "Miles_per_Gallon": Number,
    "Cylinders": Number,
    "Displacement": Number,
    "Horsepower": Number,
    "Weight_in_lbs": Number,
    "Acceleration": Number,
    "Year": String,
    "price": Number,
    "oldPrice": Number,
    "Origin": String
})

const VehiclesModel = mongoose.model("vehicles", VehiclesSchemaModel)
export { VehiclesModel }