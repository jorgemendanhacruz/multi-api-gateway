import { Router } from 'express';
import weather from './routes/weatherRoute'

export default () => {
	const app = Router();

	weather(app);
    
	return app
}