import { Hono } from "hono";
import { listPosts, createPostHandler, getPostByIdHandler, updatePostHandler, deletePostHandler } from "../controllers/postController";
const router = new Hono();

router.get('/', listPosts);
router.post('/', createPostHandler);
router.get('/:id', getPostByIdHandler);
router.patch('/:id', updatePostHandler);
router.delete('/:id', deletePostHandler);

export default router