import express, { Request, Response, NextFunction, query } from "express"
import { getAuditLogs } from './handlers/getAudit';
import { addAuditLog } from './handlers/addAuditLog';

const auditRouter = express.Router();

auditRouter.get('/', getAuditLogApi);
auditRouter.post('/new', addNewAuditLogApi);


async function getAuditLogApi(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await getAuditLogs()
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


export { auditRouter};
