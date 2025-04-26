import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from './core/environments/environment';
import { Language } from './core/enums/language';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent{
  private translate = inject(TranslateService);
  private currentLang: Language = environment.defaultLanguage as Language;

  switchLanguage() {
    const newLang: Language = this.currentLang === Language.Spanish ? Language.English : Language.Spanish;
    this.translate.use(newLang);
    this.currentLang = newLang;
  }
}
