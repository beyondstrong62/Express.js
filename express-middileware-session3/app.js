import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
const app = express();
// 1. Security
app.use(helmet());
app.use(cors());
// 2. Logging
app.use(morgan('combined'));
// 3. Rate limiting
app.use(rateLimit(
    { windowMs: 15*60*1000, max: 100 }));
// 4. Parsers
app.use(express.json({ limit: '10kb' }));
// 5. Routes
app.use('/api', apiRouter);
// 6. Error handler (LAST!)
app.use(errorHandler);
