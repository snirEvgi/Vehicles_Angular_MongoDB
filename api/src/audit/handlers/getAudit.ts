import { AuditLog } from "../../db/models/aduitLog"; 

async function getAuditLogs() {
  try {
    const result = await AuditLog.find();
    return result;
  } catch (error) {
    throw error
  }
}

export { getAuditLogs };
