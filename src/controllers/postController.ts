import { Context } from "hono";
import { getAllPosts, createPost } from "../models/postModel";

export const listPosts = async(c: Context) => {
  try {
    const posts = await getAllPosts();
    return c.json({
      success: true,
      message: 'Data Postingan',
      data: posts
    }, 200)
  } catch(err){
    console.error(`Error getting data: ${err}`);
    
  }
}

export async function createPostHandler(c: Context){
  try{
    const body = await c.req.parseBody();

    const title = typeof body['title'] === 'string' ? body['title'] : '';
    const content = typeof body['content'] === 'string' ? body['content'] : '';

    const post = await createPost({title, content})

    return c.json({
      success: true,
      message: 'Data postingan berhasil dibuat',
      data: post
    }, 201)
  }catch(e: unknown){
    console.error(`Error creating data: ${e}`);
    return c.json({
      success: false,
      message: 'Error creating post'
    }, 500)
    
  }
}