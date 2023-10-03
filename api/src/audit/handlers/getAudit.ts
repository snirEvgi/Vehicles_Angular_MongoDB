import { AuditLog } from "../../db/models/aduitLog";

async function getAuditLogs(query:any) {
  try {
    const result = await AuditLog.find({}, { __v: 0 });
    return result;
  } catch (error) {
    throw error
  }
}

export { getAuditLogs };
