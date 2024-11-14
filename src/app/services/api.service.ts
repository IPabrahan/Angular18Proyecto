import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { nationality } from '../model/nationality';
import { Meal } from '../model/meal';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient);

  constructor() { }

  /**
   * Petición GET a la API para obtener las nacionalidades
   * @returns Observable de un array de las nacionalidades
   *  de tipo {strArea: "nationality"}
   */

  getNationalities(): Observable<nationality[]> {
    return this.http.get(environment.api.nationalities)
      .pipe(map((res: any) => res.meals));
  }

  /**
   * Petición GET a la API para obtener las nacionalidades
   * @returns Observable de un array de las nacionalidades
   *  de tipo {strArea: "category"}
   */

  getCategories(): Observable<{ strCategory: string }[]> {
    return this.http.get(environment.api.categories)
      .pipe(map((res: any) => res.meals));
  }

  /**
   * Petición GET a la API para obtener las nacionalidades
   * @returns Observable de un array de las nacionalidades
   *  de tipo {strMeal : "nombre" , strMealThumb: "url", idMeal: "id"}
   */

  getRecipesByCategory(category: string): Observable<{ strMeal: string, strMealThumb: string, idMeal: string }[]> {
    return this.http.get(`${environment.api.listByCategories}${category}`)
      .pipe(map((res: any) => res.meals));
  }

  getRecipesByNationality(nationality: string): Observable<{ strMeal: string, strMealThumb: string, idMeal: string }> {
    return this.http.get(`${environment.api.listByNationality}${nationality}`)
      .pipe(map((res: any) => res.meals));
  }

  getRecipesById(id: string): Observable<Meal | undefined> {
    return this.http.get(`${environment.api.viewRecipe}${id}`)
      .pipe(map((res: any) => {
        if (res.meals && res.meals.length > 0)
          return res.meals[0]
        else
          return undefined
      }));
  }
}
