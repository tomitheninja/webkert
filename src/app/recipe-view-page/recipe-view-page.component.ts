import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FSRecipe } from '../model/recipe';
import { RecipeService } from '../services/recipe.service';
import { AuthService } from '../services/auth.service';
import { User } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-view-page',
  templateUrl: './recipe-view-page.component.html',
  styleUrls: ['./recipe-view-page.component.scss'],
})
export class RecipeViewPageComponent implements OnInit {
  recipe$!: Observable<FSRecipe>;
  user$!: Observable<User | null> | null;
  commentForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  private getId() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) throw new Error('No recipe id provided');
    return id;
  }

  ngOnInit(): void {
    this.user$ = this.authService.getStream();

    this.recipe$ = this.recipeService.getRecipe(
      this.getId()
    ) as Observable<FSRecipe>;

    this.commentForm = this.fb.group({
      content: ['', Validators.required],
    });
  }

  async deleteRecipe() {
    await this.recipeService.deleteRecipe(this.getId());
    this.router.navigate(['/']);
  }

  async addComment() {
    if (this.commentForm.invalid) {
      return;
    }
    const content = this.commentForm.value.content.trim();
    await this.recipeService.comments.add(this.getId(), content);
    this.commentForm.reset();

    const url = this.router.url;
    await this.router.navigate(['/loading'], { replaceUrl: true });
    await this.router.navigate([url], { replaceUrl: true });
  }

  async deleteComment(commentId: string) {
    await this.recipeService.comments.remove(this.getId(), commentId);
  }
}
