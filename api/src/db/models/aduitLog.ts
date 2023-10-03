import mongoose from "mongoose";

const { Schema } = mongoose;

const auditLogSchema = new mongoose.Schema({
  "_id": String,
  "price": Number,
  "oldPrice": Number,
  "action": String,
  "Hordetailsepower": Number,
  "timestamp": {
    type: Date,
    default: Date.now,
  },
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);
export { AuditLog };
