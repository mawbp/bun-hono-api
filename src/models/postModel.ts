import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface PostData {
  title: string,
  content: string
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