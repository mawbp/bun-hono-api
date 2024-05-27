import { Context } from "hono";
import { getAllPosts, createPost, getPostById, updatePost, deletePost } from "../models/postModel";

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

export async function getPostByIdHandler(c: Context){
  try{
    const postId = parseInt(c.req.param('id'));
    const post = await getPostById(postId);
    if(!post){
      return c.json({
        success: false,
        message: 'Postingan tidak ditemukan',
      }, 404);
    }
  
    return c.json({
      success: true,
      message: `Detail data post id: ${postId}`,
      data: post
    }, 200);
  } catch(e: unknown){
    console.error(`Error finding data: ${e}`);

  }
}

export async function updatePostHandler(c: Context){
  try{
    const postId = parseInt(c.req.param('id'));
    const body = await c.req.parseBody();

    const title = typeof body['title'] === 'string' ? body['title'] : '';
    const content = typeof body['content'] === 'string' ? body['content'] : '';

    const post = await updatePost(postId, {title, content});
    return c.json({
      success: true,
      message: 'Data postingan berhasil di-update',
      data: post
    }, 200);
  } catch(e: unknown){
    console.error(`Error update data: ${e}`);
    
  }
}

export async function deletePostHandler(c: Context){
  try{
    const postId = parseInt(c.req.param('id'));
    await deletePost(postId);
    return c.json({
      success: true,
      message: 'Data postingan berhasil dihapus',
    }, 200);
  } catch(e: unknown){
    console.error(`Error deletingdata: ${e}`);
  }
}