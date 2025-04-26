import { importProvidersFrom } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateFakeLoader } from '@ngx-translate/core';

export function provideTranslateTesting() {
  return importProvidersFrom(
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
    }),
  );
}
