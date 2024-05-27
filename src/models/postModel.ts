import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface PostData {
  title: string,
  content: string
}

interface FindData {
  id: string,
}

export const getAllPosts = async() => {
  return await prisma.post.findMany({orderBy: {id: 'desc'}})
}

export async function createPost(data: PostData){
  try{
    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content
      }
    });
    return post;
  }catch(err: unknown){
    console.error(`Error creating data: ${err}`);
    throw err;
  }
}

export async function getPostById(postId: number){
  try{
    const post = await prisma.post.findUnique({
      where: {id: postId}
    });
    return post;
  } catch(e: unknown){
    console.error(`Error getting data: ${e}`);
    throw e;
  }
}

export async function updatePost(postId: number, data: PostData){
  try{
    const post = await prisma.post.update({
      where: {id: postId},
      data: {
        title: data.title,
        content: data.content,
        updatedAt: new Date(),
      }
    });
    return post;
  } catch(e: unknown){
    console.error(`Error update data: ${e}`);
    throw e;
  }
}

export async function deletePost(postId: number){
  try{
    await prisma.post.delete({
      where: {id: postId},
    });
  } catch(e: unknown){
    console.error(`Error deleting data: ${e}`);
    throw e;
  }
}