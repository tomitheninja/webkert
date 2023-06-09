import { RecipeComment } from './recipe-comment';

export class FSRecipe {
  id?: string;
  title: string = '';
  description: string = '';
  imageUrl: string | null = null;
  ingredients: RecipeIngredient[] = [];
  instructions: string = '';
  createdDate?: Date = new Date();
  updatedDate?: Date = new Date();
  authorId!: string;
  authorName!: string;
  comments: RecipeComment[] = [];

  constructor(json: Partial<FSRecipe>) {
    Object.assign(this, json);
    if (!this.authorId || !this.authorName) {
      throw new Error(`Recipe#${this.id} must have an author`);
    }
  }
}

export interface RecipeIngredient {
  name: string;
  amount: string;
}
