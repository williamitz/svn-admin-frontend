import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { SegurityLayoutModule } from './layouts/segurity-layout/segurity-layout.module';

import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

// Language
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { StoreModule } from '@ngrx/store';
import { AppState } from './app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    ErrorPageComponent,
  ],
  imports: [

    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppRoutingModule,

    AuthLayoutModule,
    SegurityLayoutModule,
    AdminLayoutModule,

    StoreModule.forRoot( AppState ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
