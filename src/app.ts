import cors from 'cors';
import { setupDocs } from '../util/documentation';
import express, {Application, Request, Response} from 'express'
import routes from './routes';
import { connect } from './repositroy/database'  

// create express application test
const app: Application = express();

export async function startServer() {  
  
  app.use(cors({
    origin: [
      'http://localhost:3000', 
      'http://localhost:4000', 
      'https://strategifrontend.onrender.com'
    ],
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'auth-token', 
      'Authorization',
      'Origin', 
      'X-Requested-With', 
      'Content-Type', 
      'Accept',
    ],
  }));
  
  // JSON body parser
  app.use(express.json());

  app.use('/api', routes)

  setupDocs(app);

  // Connect to database once and keep it open
  try {
    await connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);  // Exit if database connection fails
  }
   
  // start server
  const PORT: number = parseInt(process.env.PORT as string) || 4000;
  app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
  })
}