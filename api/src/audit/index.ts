import express, { Request, Response, NextFunction, query } from "express"
import { getAuditLogs } from './handlers/getAudit';
import { addAuditLog } from './handlers/addAuditLog';
import { findAuditById } from "./handlers/findAuditById";

const auditRouter = express.Router();

auditRouter.get('/', getAuditLogApi);
auditRouter.post('/new', addNewAuditLogApi);
auditRouter.get('/:id', getAuditLogByIdApi);


async function getAuditLogApi(req: Request, res: Response, next: NextFunction) {
    try {
        const query = req.query
        const result = await getAuditLogs(query)
        res.json(result);
    } catch (error) {
        console.log(error,"error fetching data");
        return next(error)
    }
}

async function addNewAuditLogApi(req: Request, res: Response, next: NextFunction) {
    try {
        const logData = req?.body;
        const result = await addAuditLog(logData)
        res.json(result);
    } catch (error:any) {
        console.log(error.message);
        return next(error)
    }
}
async function getAuditLogByIdApi(req: Request, res: Response, next: NextFunction) {
    try {
        const {id }= req?.params;
        const result = await findAuditById(id)
        res.json(result);
    } catch (error:any) {
        console.log(error.message);
        return next(error)
    }
}


export { auditRouter};
