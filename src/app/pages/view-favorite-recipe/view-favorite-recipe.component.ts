// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-view-favorite-recipe',
//   standalone: true,
//   imports: [],
//   templateUrl: './view-favorite-recipe.component.html',
//   styleUrl: './view-favorite-recipe.component.css'
// })
// export class ViewFavoriteRecipeComponent {

// }
import { Component, inject, input, signal, WritableSignal } from '@angular/core';
// import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FireService } from '../../services/fire.service';
@Component({
  selector: 'app-view-favorite-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-favorite-recipe.component.html',
  styleUrl: './view-favorite-recipe.component.css'
})
export class ViewFavoriteRecipeComponent {
  fire = inject(FireService);

  /*
   @Input()
   id: string | undefined;
  */
  id = input.required<string>();

  $state: WritableSignal<any> = signal({
    data: [],
    loading: true,
    error: null

  })
  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    console.log("INICIO DEL FETCH")
    this.$state.update(state => {
      return { ...state, loading: true }
    });
    let request = this.fire.getRecipesById(this.id());
    request?.subscribe({
      next: (data: any) => {
        // console.log(JSON.stringify(this.$state().data) + "data")
        this.$state.update(state => {
          return { ...state, loading: false, data: data }
        });

      },
      error: (error: any) => {
        console.error(error)
        this.$state.update(state => {
          return { ...state, loading: false, data: [], error: error }
        });
      }
    })
  }
}