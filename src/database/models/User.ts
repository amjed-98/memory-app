import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

UserSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'user',
});

export default mongoose.model('User', UserSchema);
