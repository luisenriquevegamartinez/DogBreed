import { Component, inject, OnInit } from '@angular/core';
import { DogApiService } from '../../core/api/dog-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-breed-picture',
  standalone: true,
  imports: [
    TranslateModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './breed-picture.component.html',
  styleUrl: './breed-picture.component.scss',
})
export class BreedPictureComponent implements OnInit {
  private dogApiService = inject(DogApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public breedName: string = '';
  public subBreedName: string = '';
  public breedPicture: string = '';
  public subBreeds: string[] = [];

  ngOnInit() {
    this.fetchImage();
    this.getSubBreeds();
  }

  fetchImage() {
    this.route.params.subscribe(({ breed, subBreed }) => {
      this.breedName = breed;
      this.subBreedName = subBreed || '';

      const image$ = this.subBreedName
        ? this.dogApiService.getRandomImageByBreed(
            `${this.breedName}/${this.subBreedName}`
          )
        : this.dogApiService.getRandomImageByBreed(this.breedName);
      image$.subscribe((image) => {
        this.breedPicture = image;
      });
    });
  }

  getSubBreeds() {
    this.dogApiService.getSubBreeds(this.breedName).subscribe((subBreeds) => {
      this.subBreeds = subBreeds.filter(subBreed => subBreed !== this.subBreedName);
    });
  }

  goBack() {
    this.router.navigate(['/list'], { relativeTo: this.route });
  }

  goToBreedPage(subBreed?: string) {
    this.router.navigate([
      'picture',
      this.breedName,
      subBreed
    ].filter(Boolean));
  }
}
