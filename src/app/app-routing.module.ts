import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { CatsListComponent } from './containers/cats-list/cats-list.component';
import { CatDetailsComponent } from './components/cat-details/cat-details.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'cats', component: CatsListComponent },
  { path: 'cat-details/:id', component: CatDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
