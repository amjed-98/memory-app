import mongoose from 'mongoose';

const MemorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

MemorySchema.index({ tags: 'text', title: 'text' });

MemorySchema.virtual('images', {
  ref: 'Image',
  localField: '_id',
  foreignField: 'memory',
});
MemorySchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'memory',
});
MemorySchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'memory',
});
MemorySchema.virtual('shares', {
  ref: 'SharedMemory',
  localField: '_id',
  foreignField: 'memory',
});

export default mongoose.model('Memory', MemorySchema);
