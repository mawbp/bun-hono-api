import { Hono } from 'hono'
import router from './routes'

const app = new Hono().basePath('/api');

app.route('/posts', router)

export default app