import 'zone.js/dist/zone';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PersonDetailComponent } from './components/smart/person-detail/person-detail.component';
import { AddUserComponent } from './components/smart/add-user/add-user.component';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot([
      {
        path: 'people/:id',
        component: PersonDetailComponent
      },
      {
        path: 'add-user',
        component: AddUserComponent
      }
    ])),
    importProvidersFrom(HttpClientModule)]
});
