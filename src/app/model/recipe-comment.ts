export interface FSRecipeComment {
  id?: string;
  recipeId: string;
  userId: string;
  userName: string;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}
