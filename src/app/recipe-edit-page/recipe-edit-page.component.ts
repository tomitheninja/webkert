import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DocumentData,
  Firestore,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { FSRecipe } from '../model/recipe';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { addDoc, collection } from '@angular/fire/firestore';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { UserService } from '../services/user.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-edit-page',
  templateUrl: './recipe-edit-page.component.html',
  styleUrls: ['./recipe-edit-page.component.scss'],
})
export class RecipeEditPageComponent implements OnInit {
  //recipe$!: Observable<FSRecipe>;
  recipeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestore: Firestore,
    private fsStorage: Storage,
    private userService: UserService,
    private recipeService: RecipeService,
    private fb: FormBuilder
  ) {}

  private getId() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) throw new Error('No recipe id provided');
    return id;
  }

  async ngOnInit() {
    if (this.getId() === 'new') {
      const user = await this.userService.getUser();
      if (!user) throw new Error('No user logged in');
      this.initForm(
        new FSRecipe({
          authorId: user.id,
          authorName: user.name,
        })
      );
    } else {
      const recipeRef = doc(this.firestore, 'recipes', this.getId());

      const snap = await getDoc(recipeRef);
      if (!snap.exists()) throw new Error('No such document!');
      this.initForm(snap.data() as FSRecipe);
    }
  }

  initForm(recipeData: FSRecipe): void {
    this.recipeForm = this.fb.group({
      authorId: [recipeData.authorId],
      authorName: [recipeData.authorName],
      imageUrl: [recipeData.imageUrl],
      title: [recipeData.title, Validators.required],
      description: [recipeData.description, Validators.required],
      ingredients: this.fb.array(
        recipeData.ingredients?.map((ingredient) =>
          this.fb.group({
            name: [ingredient.name, Validators.required],
            amount: [ingredient.amount, Validators.required],
          })
        ) || []
      ),
      instructions: [recipeData.instructions, Validators.required],
    });
  }

  async createRecipe(recipeData: FSRecipe): Promise<void> {
    const id = await this.recipeService.createRecipe(recipeData);
    this.router.navigate(['/recipes', id]);
  }

  async uploadImage(event: Event): Promise<void> {
    const imageUrl = await this.recipeService.uploadImage(event, this.getId());
    console.log({ imageUrl });
    this.recipeForm.patchValue({ imageUrl });
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    this.ingredients.push(
      this.fb.group({
        name: ['', Validators.required],
        amount: ['', Validators.required],
      })
    );
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  async submitRecipe(): Promise<void> {
    if (this.recipeForm.valid) {
      const recipeId = this.route.snapshot.paramMap.get('id');

      if (recipeId === 'new') {
        await this.createRecipe(this.recipeForm.value);
      } else {
        await this.recipeService.updateRecipe({
          ...this.recipeForm.value,
          id: recipeId,
        });
        this.router.navigate(['/recipes', recipeId]);
      }
    }
  }
}
