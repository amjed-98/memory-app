import mongoose from 'mongoose';

const memoryImageSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    memory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Memory',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Image', memoryImageSchema);
