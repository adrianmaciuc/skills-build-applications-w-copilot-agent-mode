import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    activityType: { type: String, trim: true },
    duration: { type: Number, min: 0 },
    difficulty: { type: String, trim: true },
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
