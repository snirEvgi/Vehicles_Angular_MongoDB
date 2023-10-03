import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import { initConnection } from "./db/connection"
import { VehiclesModel } from "./db/models/vehicles"
import cors from "cors"
import  {vehiclesRouter,auditRouter}  from "./routes.index"
dotenv.config()
initConnection()
const app = express();
app.use(express.json())
app.use(cors())

app.get("/health-check", (req, res) => {
    res.json({ message: "API IS RUNNING" })

})

app.use("/vehicles",vehiclesRouter)

app.use("/audit", auditRouter)


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send("Something went wrong")
  })
app.listen(process.env.PORT, () => {
    console.log(`Application is running on ${process.env.PORT}`)
})
