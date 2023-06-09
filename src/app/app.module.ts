import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HomePageComponent } from './home-page/home-page.component';
import { RecipeListPageComponent } from './recipe-list-page/recipe-list-page.component';
import { RecipeViewPageComponent } from './recipe-view-page/recipe-view-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RecipeEditPageComponent } from './recipe-edit-page/recipe-edit-page.component';
import { RelativeDatePipe } from './pipe/relative-date.pipe';
import { ChangeNameDialogComponent } from './change-name-dialog/change-name-dialog.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RecipeListPageComponent,
    RecipeViewPageComponent,
    ProfilePageComponent,
    RecipeEditPageComponent,
    RelativeDatePipe,
    ChangeNameDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    MarkdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
