import express, { type ErrorRequestHandler } from 'express';
import Activity from './models/activity';
import Leaderboard from './models/leaderboard';
import Team from './models/team';
import User from './models/user';
import Workout from './models/workout';
import { connectDatabase } from './config/database';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
]);

app.use(express.json());

app.use((request, response, next) => {
  const origin = request.get('Origin');

  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  }

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  next();
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().lean());
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().lean());
});

app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().lean());
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().sort({ points: -1 }).lean());
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().lean());
});

const handleError: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
};

app.use(handleError);

export async function startServer(): Promise<void> {
  await connectDatabase();

  await new Promise<void>((resolve, reject) => {
    const server = app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit Tracker API listening on port ${port}`);
      console.log(`API base URL: ${baseUrl}`);
      resolve();
    });
    server.once('error', reject);
  });
}

export default app;
