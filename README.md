# RecipeManagementApp

https://recipe-managment.web.app/

mat-button
mat-icon
mat-list-item
mat-menu
mat-nav-list
mat-sidenav-container
mat-sidenav
mat-toolbar

- [ ] Fordítási hiba nincs
- [ ] Futtatási hiba nincs
- [ ] Firebase Hosting URL (létezik, és minden végpont megfelelő módon betöltődik)
- [x] Adatmodell definiálása (legalább 4 TypeScript interfész vagy class formájában (ugyanennyi kollekció))
  1. FSUser
  2. FSRecipe
  3. FSIngredient
  4. FSComment
- [x] Alkalmazás felbontása megfelelő számú komponensre (egyetlen komponens TS és HTML kódja sem haladja meg a 250 sort és soronként a 400 karaktert)
  1. `find src -type f | grep -e '.ts' -e '.html' | xargs wc -l | sort -n | tail -1` # 128
  2. `find src -type f | grep -e '.ts' -e '.html' | awk '{print length}' | sort -n | tail -1` # 60
- [ ] Reszponzív, mobile-first felület (minden adat látható és jól jelenik meg böngészőben is, mobil nézetben is)
- [x] Legalább 2 különböző attribútum direktíva használata
  1. appGoogleSignin
  2. appSignout
- [x] Legalább 2 különböző strukturális direktíva használata
  1. ngIf
  2. ngFor
- [ ] Adatátadás szülő és gyermek komponensek között (legalább 1 @Input és 1 @Output)
- [x] Legalább 10 különböző Material elem helyes használata.
  1. mat-button
  2. mat-icon
  3. mat-list-item
  4. mat-menu
  5. mat-nav-list
  6. mat-sidenav-container
  7. mat-sidenav
  8. mat-toolbar
  9. MatInputModule,
  10. FormsModule,
- [x] Adatbevitel Angular form-ok segítségével megvalósítva (legalább 2)
  1. recipeForm
  2. commentForm
- [x] Legalább 1 saját Pipe osztály írása és használata
  1. RelativeDatePipe
- [x] Legalább 2 különböző Lifecycle Hook használata a teljes projektben (értelmes tartalommal, nem üresen)
  1. ngOnInit
  2. ngOnDestroy
- [x] CRUD műveletek mindegyike megvalósult (Promise, Observable használattal)
- [x] CRUD műveletek service-ekbe vannak kiszervezve és megfelelő módon injektálva lettek
- [x] Firestore adatbázis használata az adatokhoz (integráció, környezeti változók használata helyes legyen)
- [x] Legalább 2 komplex Firestore lekérdezés megvalósítása (ide tartoznak: where feltétel, rendezés, léptetés, limitálás)\
  1.  updateAuthorName - where
  2.  listRecipes - orderBy
- [x] Legalább 4 különböző route a különböző oldalak eléréséhez
  1. / (home)
  2. /recipes
  3. /recipes/:id
  4. /recipes/:id/edit
  5. /profile
- [x] Legalább 2 route levédése azonosítással (AuthGuard) (ahol ennek értelme van, pl.: egy fórum témakör megtekinthető bárki számára, de a regisztrált felhasználó adatai nem)
  1. /recipes/:id/edit
  2. /profile
- [ ] Szubjektív pontozás a projekt egészére vonatkozólag (mennyire fedi le a projekt a témakört (mennyire kapcsolódik hozzá), mennyi lehet a befektetett energia a projektben)
