import { model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now },
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export default model('Activity', activitySchema);
