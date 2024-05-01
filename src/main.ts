//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptorService } from './app/auth/auth-interceptor.service';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { recipesReducer } from './app/store/recipes.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptorsFromDi()),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true,
    },
    provideStore({
      recipes: recipesReducer
    })
]
});

// Module implementation
//platformBrowserDynamic().bootstrapModule(AppModule)
  //.catch(err => console.error(err));
