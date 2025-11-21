import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export type PostVisibility = 'public' | 'friends' | 'private';

export interface CreatePostData {
  content: string;
  media?: string[];  // Array of uploaded media URLs
  visibility: PostVisibility;
}

export interface Post {
  id?: string;
  authorId: string;
  content: string;
  media?: string[];
  visibility: PostVisibility;
  createdAt: any; // Firebase Timestamp
  engagementScore: number;
}

/**
 * Creates a new post with the specified visibility
 */
export async function createPost({
  content,
  media = [],
  visibility
}: CreatePostData, userId: string): Promise<Post> {
  if (!userId) {
    throw new Error('User must be authenticated to create a post');
  }

  if (!content.trim()) {
    throw new Error('Post content cannot be empty');
  }

  if (!['public', 'friends', 'private'].includes(visibility)) {
    throw new Error('Invalid visibility setting');
  }

  try {
    const postData: Omit<Post, 'id'> = {
      authorId: userId,
      content: content.trim(),
      media,
      visibility,
      createdAt: serverTimestamp(),
      engagementScore: 0,
    };

    const docRef = await addDoc(collection(db, 'posts'), postData);

    return {
      id: docRef.id,
      ...postData,
    };
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post. Please try again.');
  }
}
