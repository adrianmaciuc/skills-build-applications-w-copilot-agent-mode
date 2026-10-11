import mongoose, { Types } from 'mongoose';
import activity from '../models/activity';
import leaderboard from '../models/leaderboard';
import team from '../models/team';
import user from '../models/user';
import workout from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const ids = {
  users: [
    new Types.ObjectId('650000000000000000000001'),
    new Types.ObjectId('650000000000000000000002'),
    new Types.ObjectId('650000000000000000000003'),
  ],
  teams: [
    new Types.ObjectId('650000000000000000000011'),
    new Types.ObjectId('650000000000000000000012'),
  ],
  activities: [
    new Types.ObjectId('650000000000000000000021'),
    new Types.ObjectId('650000000000000000000022'),
    new Types.ObjectId('650000000000000000000023'),
    new Types.ObjectId('650000000000000000000024'),
    new Types.ObjectId('650000000000000000000025'),
    new Types.ObjectId('650000000000000000000026'),
  ],
  leaderboard: [
    new Types.ObjectId('650000000000000000000031'),
    new Types.ObjectId('650000000000000000000032'),
    new Types.ObjectId('650000000000000000000033'),
  ],
  workouts: [
    new Types.ObjectId('650000000000000000000041'),
    new Types.ObjectId('650000000000000000000042'),
    new Types.ObjectId('650000000000000000000043'),
    new Types.ObjectId('650000000000000000000044'),
  ],
};

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      user.deleteMany({ _id: { $in: ids.users } }),
      team.deleteMany({ _id: { $in: ids.teams } }),
      activity.deleteMany({ _id: { $in: ids.activities } }),
      leaderboard.deleteMany({ _id: { $in: ids.leaderboard } }),
      workout.deleteMany({ _id: { $in: ids.workouts } }),
    ]);

    const [alice, ben, chloe] = await user.insertMany([
      {
        _id: ids.users[0],
        name: 'Alice Runner',
        username: 'alice_runner',
        email: 'alice@example.com',
        teamId: ids.teams[0],
      },
      {
        _id: ids.users[1],
        name: 'Ben Walker',
        username: 'ben_walker',
        email: 'ben@example.com',
        teamId: ids.teams[0],
      },
      {
        _id: ids.users[2],
        name: 'Chloe Strength',
        username: 'chloe_strength',
        email: 'chloe@example.com',
        teamId: ids.teams[1],
      },
    ]);

    await team.insertMany([
      {
        _id: ids.teams[0],
        name: 'Trail Blazers',
        description: 'A team focused on running and outdoor challenges.',
        members: [alice._id, ben._id],
      },
      {
        _id: ids.teams[1],
        name: 'Power Octopuses',
        description: 'A team building strength through consistent training.',
        members: [chloe._id],
      },
    ]);

    const activityDates = [7, 5, 4, 3, 2, 1].map((daysAgo) => {
      const date = new Date();
      date.setUTCDate(date.getUTCDate() - daysAgo);
      return date;
    });

    await activity.insertMany([
      { _id: ids.activities[0], userId: alice._id, type: 'Running', duration: 35, points: 60, date: activityDates[0] },
      { _id: ids.activities[1], userId: alice._id, type: 'Cycling', duration: 45, points: 45, date: activityDates[2] },
      { _id: ids.activities[2], userId: alice._id, type: 'Strength Training', duration: 40, points: 65, date: activityDates[4] },
      { _id: ids.activities[3], userId: ben._id, type: 'Walking', duration: 50, points: 75, date: activityDates[1] },
      { _id: ids.activities[4], userId: ben._id, type: 'Running', duration: 30, points: 50, date: activityDates[5] },
      { _id: ids.activities[5], userId: chloe._id, type: 'Strength Training', duration: 45, points: 110, date: activityDates[3] },
    ]);

    await leaderboard.insertMany([
      { _id: ids.leaderboard[0], userId: alice._id, points: 170, rank: 1 },
      { _id: ids.leaderboard[1], userId: ben._id, points: 125, rank: 2 },
      { _id: ids.leaderboard[2], userId: chloe._id, points: 110, rank: 3 },
    ]);

    await workout.insertMany([
      {
        _id: ids.workouts[0],
        name: 'Interval Run',
        description: 'Alternate brisk running with recovery jogs.',
        activityType: 'Running',
        duration: 30,
        difficulty: 'Intermediate',
      },
      {
        _id: ids.workouts[1],
        name: 'Neighborhood Walk',
        description: 'A steady-paced walk to build daily activity.',
        activityType: 'Walking',
        duration: 40,
        difficulty: 'Beginner',
      },
      {
        _id: ids.workouts[2],
        name: 'Full-Body Strength',
        description: 'A balanced bodyweight strength session.',
        activityType: 'Strength Training',
        duration: 35,
        difficulty: 'Intermediate',
      },
      {
        _id: ids.workouts[3],
        name: 'Recovery Ride',
        description: 'An easy cycling session at a comfortable pace.',
        activityType: 'Cycling',
        duration: 45,
        difficulty: 'Beginner',
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

void seedDatabase();
