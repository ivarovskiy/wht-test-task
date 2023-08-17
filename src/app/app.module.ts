import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './components/card/card.component';
import { FilterComponent } from './components/filter/filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CatsListComponent } from './containers/cats-list/cats-list.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { CatState } from './store/cat.state';
import { LoaderComponent } from './components/loader/loader.component';
import { CatDetailsComponent } from './components/cat-details/cat-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    FilterComponent,
    CatsListComponent,
    TruncatePipe,
    HomePageComponent,
    LoaderComponent,
    CatDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    NgxsModule.forRoot([CatState]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
