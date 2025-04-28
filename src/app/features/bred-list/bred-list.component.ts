import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { DogApiService } from '../../core/api/dog-api.service';
import { DogBreedModel } from '../../core/api/dog-api.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bred-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './bred-list.component.html',
  styleUrl: './bred-list.component.scss',
})
export class BredListComponent implements OnInit {
  private dogApiService = inject(DogApiService);
  private translate = inject(TranslateService);
  private router = inject(Router);
  private breeds: DogBreedModel[] = [];
  public filteredBreeds: DogBreedModel[] = [];
  public searchControl = new FormControl<string>('');

  ngOnInit() {
    this.dogApiService.getBreeds().subscribe((breeds) => {
      this.breeds = breeds;
      this.filteredBreeds = breeds;
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((breedForSearch) => {
        if (breedForSearch) {
          this.filteredBreeds = this.breeds.filter((breed) => {
            const translatedBreed = this.translate.instant(
              `breeds.${breed.name}`
            );
            return this.compareNormalizedStrings(
              translatedBreed,
              breedForSearch
            );
          });
        } else {
          this.filteredBreeds = this.breeds;
        }
      });
  }

  private compareNormalizedStrings(str1: string, str2: string): boolean {
    const removeAccents = (str: string) =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const removeSpaces = (str: string) => str.replace(/\s+/g, '');
    const toLowerCase = (str: string) => str.toLowerCase();

    const normalizedStr1 = removeAccents(removeSpaces(toLowerCase(str1)));
    const normalizedStr2 = removeAccents(removeSpaces(toLowerCase(str2)));

    return (
      normalizedStr1.includes(normalizedStr2) ||
      normalizedStr2.includes(normalizedStr1)
    );
  }

  navigateToBreedPicture(breed: string, subBreed?: string) {
    this.router.navigate(['picture', breed, subBreed].filter(Boolean));
  }
}
