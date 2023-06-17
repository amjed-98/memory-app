import { Schema, model, Document } from 'mongoose';

const sharedMemorySchema = new Schema(
  {
    memory: { type: Schema.Types.ObjectId, ref: 'Memory', required: true },
    sharedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default model('SharedMemory', sharedMemorySchema);
