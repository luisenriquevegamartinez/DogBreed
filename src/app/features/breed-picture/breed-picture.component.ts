import { Component, inject, OnInit } from '@angular/core';
import { DogApiService } from '../../core/api/dog-api.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-breed-picture',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './breed-picture.component.html',
  styleUrl: './breed-picture.component.scss',
})
export class BreedPictureComponent implements OnInit {
  private dogApiService = inject(DogApiService);
  private route = inject(ActivatedRoute);

  public breedName: string = '';
  public subBreedName: string = '';
  public breedPicture: string = '';

  ngOnInit() {
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
}
