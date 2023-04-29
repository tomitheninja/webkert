import { Timestamp } from '@angular/fire/firestore';

export interface RecipeComment {
  id: string;
  authorId: string;
  authorName: string;
  comment: string;
  createdAt: Date | Timestamp;
}
