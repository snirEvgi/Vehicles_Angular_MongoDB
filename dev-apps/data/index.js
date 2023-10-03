const mongoose = require("mongoose")
const data = require("./index.json")

async function seed() {
    const mongoDBUrl = "mongodb://localhost:27017/Vehicles"

    async function mainConnection() {
        await mongoose.connect(mongoDBUrl)
    }



    mainConnection().then(async () => {
        console.log("DB Connected")
        const TestSchemModel = new mongoose.Schema({
            Name: String,
            "Miles_per_Gallon": Number,
            "Cylinders": Number,
            "Displacement": Number,
            "Horsepower": Number,
            "Weight_in_lbs": Number,
            "Acceleration": Number,
            "Year": String,
            "price":Number,
            "Origin": String
        })
        const TestModel = mongoose.model("vehicles", TestSchemModel)
        await TestModel.insertMany(data)
        setTimeout(() => {
            process.exit()
        }, 3000);
    }).catch(() => {
        console.log("ERROR DB not Connected")
    })
}

seed();