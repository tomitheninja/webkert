export interface FSRecipeComment {
  id?: string;
  recipeId: string;
  userId: string;
  userName: string;
  comment: string;
  createdAt?: Date | { seconds: number };
  updatedAt?: Date | { seconds: number };
}
