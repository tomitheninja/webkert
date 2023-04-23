import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { FSRecipe } from '../model/recipe';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Component({
  selector: 'app-recipe-edit-page',
  templateUrl: './recipe-edit-page.component.html',
  styleUrls: ['./recipe-edit-page.component.scss'],
})
export class RecipeEditPageComponent implements OnInit {
  recipe$!: Observable<FSRecipe>;
  recipeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestore: Firestore,
    private fsStorage: Storage,
    private fb: FormBuilder
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

            this.recipeForm = this.fb.group({
              title: [recipeData.title, Validators.required],
              description: [recipeData.description, Validators.required],
              ingredients: this.fb.array(
                recipeData.ingredients.map((ingredient) =>
                  this.fb.group({
                    name: [ingredient.name, Validators.required],
                    amount: [ingredient.amount, Validators.required],
                  })
                )
              ),
              instructions: [recipeData.instructions, Validators.required],
            });
          }
        });
      });
    }
  }

  async uploadImage(event: Event): Promise<void> {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) return;
    const recipeId = this.route.snapshot.paramMap.get('id');
    const extension = file.name.split('.').pop();
    const filePath = `recipes/${recipeId}/image.${extension}`;
    const fileRef = ref(this.fsStorage, filePath);
    const uploadTask = await uploadBytes(fileRef, file);

    // get http url
    const downloadURL = await getDownloadURL(uploadTask.ref);
    console.log('downloadURL', downloadURL);

    if (recipeId) {
      const recipeRef = doc(this.firestore, 'recipes', recipeId);
      await updateDoc(recipeRef, { imageUrl: downloadURL });
    }
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
      const recipeRef = doc(this.firestore, 'recipes', recipeId!);
      const updatedDate = new Date();

      await updateDoc(recipeRef, {
        ...this.recipeForm.value,
        updatedDate,
      });

      this.router.navigate(['/recipes', recipeId]);
    }
  }
}
