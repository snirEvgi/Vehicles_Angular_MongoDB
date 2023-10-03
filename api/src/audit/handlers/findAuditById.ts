import { AuditLog } from "../../db/models/aduitLog";

export async function findAuditById(id: string) {
    try {
        const audit = await AuditLog.findById(id);
        if (!audit) {
            throw new Error("Vehicle not found");
        }
        return audit;
    } catch (error) {
        console.error(error);
        throw error
    }
}
