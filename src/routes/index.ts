import { Hono } from "hono";
import { listPosts, createPostHandler } from "../controllers/postController";
const router = new Hono();

router.get('/', listPosts);
router.post('/', createPostHandler);

export default router