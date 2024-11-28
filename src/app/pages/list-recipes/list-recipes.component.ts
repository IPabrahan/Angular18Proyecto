import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Recipe } from '../../model/recipe';
import { FireService } from '../../services/fire.service';
import { FormModalComponent } from '../../modal/form-modal/form-modal.component';

@Component({
  selector: 'app-list-recipes',
  standalone: true,
  imports: [NgClass, FormModalComponent],
  templateUrl: './list-recipes.component.html',
  styleUrl: './list-recipes.component.css'
})
export class ListRecipesComponent {
  api = inject(ApiService);
  router = inject(Router);
  fire = inject(FireService);


  @Input()
  type: string = "";

  @Input()
  subtype: string = "";

  isModalOpen: boolean = false;

  $state: WritableSignal<any> = signal({
    loading: false,
    error: false,
    data: []
  }
  )

  ngOnInit() {
    this.fetchData()
  }

  fetchData() {
    // Llamar al servicio
    this.$state.update(state => ({
      ...state, loading: true
    }))

    let request;
    switch (this.type) {
      case 'category':
        request = this.api.getRecipesByCategory(this.subtype);
        break;
      case 'nationality':
        request = this.api.getRecipesByNationality(this.subtype);
        break;
      case undefined:
        request = this.fire.getRecipesWithID();
        break;
      default:
        request = null;
    }

    if (request) {
      // suscribo al observable
      (request as any).subscribe({
        next: (data: any) => {
          console.log("DATA")
          console.log(data)
          this.$state.update(state => ({
            ...state, loading: false, error: false, data: data
          }))
        },
        error: (err: any) => {
          this.$state.update(state => ({
            ...state, loading: false, error: err, data: []
          }))
        }
      })
    } else {
      // error
      this.$state.update((state) => ({
        ...state, loading: false, error: 'Categoría incorrecta'
      }));
    }
  }

  goToRecipe(idMeal: string) {
    // navega /recipe/:id
    this.router.navigate(['recipe', idMeal])
  }

  goToFavoriteRecipe(idMeal: string) {
    // navega/favorite/:id
    this.router.navigate(['favorite', idMeal])
  }

  openModal() {
    this.isModalOpen = true
    history.pushState({}, document.title)
    // Luego añadimos algo más
  }

  closeModal($event?: any) {
    if ($event) {
      console.log("Desde el componente que abre el modal: " + $event)
      // Podemos hacer algo...
    }
    this.isModalOpen = false;
  }

  onDeleteRecipe(idMeal: string): void {
    this.fire.deleteRecipe(idMeal)
      .then(() => {
        console.log(`Receta con idMeal: ${idMeal} eliminada correctamente`);
      })
      .catch(error => {
        console.error('Error al borrar la receta:', error);
      });
  }

}