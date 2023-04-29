import { Injectable } from '@angular/core';
import {
  Firestore,
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { RecipeComment } from '../model/recipe-comment';
import { UserService } from './user.service';
import { generate } from 'shortid';

@Injectable({
  providedIn: 'root',
})
export class RecipeCommentService {
  constructor(private db: Firestore, private userService: UserService) {}

  async add(recipeId: string, comment: string) {
    const user = await this.userService.getUser();
    if (!user) throw new Error('User is not authenticated');

    const newComment: RecipeComment = {
      id: generate(),
      authorId: user.id,
      authorName: user.name,
      comment,
      createdAt: new Date(),
    };

    const recipeDoc = doc(this.db, 'recipes', recipeId);
    await updateDoc(recipeDoc, { comments: arrayUnion(newComment) });
    return newComment;
  }

  async remove(recipeId: string, commentId: string) {
    const user = await this.userService.getUser();
    if (!user) throw new Error('User is not authenticated');

    const recipeDoc = doc(this.db, 'recipes', recipeId);
    await updateDoc(recipeDoc, {
      comments: arrayRemove({ id: commentId, authorId: user.id }),
    });
  }
}
