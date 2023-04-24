import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Firestore, deleteDoc, doc, getDoc } from '@angular/fire/firestore';
import { FSRecipe } from '../model/recipe';
import { UserService } from '../services/user.service';
import { FSUser } from '../model/user';

@Component({
  selector: 'app-recipe-view-page',
  templateUrl: './recipe-view-page.component.html',
  styleUrls: ['./recipe-view-page.component.scss'],
})
export class RecipeViewPageComponent implements OnInit {
  recipe$!: Observable<FSRecipe>;
  user$: Observable<FSUser | null> | null = null;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');

    if (recipeId) {
      const recipeRef = doc(this.firestore, 'recipes', recipeId);
      this.recipe$ = new Observable<FSRecipe>((observer) => {
        getDoc(recipeRef).then((doc) => {
          if (doc.exists()) {
            const recipeData = doc.data() as FSRecipe;
            observer.next(recipeData);
          }
        });
      });
    }

    // get the currently logged-in user
    this.user$ = this.userService.getStream();
  }

  async deleteRecipe(): Promise<void> {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (!recipeId) {
      return;
    }

    const recipeRef = doc(this.firestore, 'recipes', recipeId);
    await deleteDoc(recipeRef);
    this.router.navigate(['/']);
  }
}
