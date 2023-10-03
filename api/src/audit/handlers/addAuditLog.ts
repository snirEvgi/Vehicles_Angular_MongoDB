import { AuditLog } from "../../db/models/aduitLog";

export async function addAuditLog(log: any) {
  try {
      const newLog = new AuditLog(log);
      await newLog.save();
      return newLog;
  } catch (error) {
    console.error(error);
    throw error
  }
}
