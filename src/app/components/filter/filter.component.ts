import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { CatApiService } from 'src/app/services/cat-api.service';
import { FetchCats } from 'src/app/store/cat.actions';

interface Breed {
  id: string;
  name: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
  @Output() loadingStateChanged = new EventEmitter<boolean>();

  filterForm = this.fb.group({
    limit: ['10', Validators.min(1)],
    breed: ['all', Validators.required],
  });

  breeds: Breed[] = [];

  private formSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private catApiService: CatApiService,
    private store: Store
  ) {}

  ngOnInit() {
    this.catApiService.fetchBreedNames().subscribe(breeds => {
      this.breeds = breeds;
    });
    this.formSubscription = this.filterForm.valueChanges.subscribe(
      formValue => {
        this.loadingStateChanged.emit(false);

        const { breed, limit } = formValue;

        const selectedBreed = breed === 'All' ? 'all' : breed;

        this.catApiService
          .fetchCatsFromApi(limit, selectedBreed)
          .subscribe(cats => {
            this.store.dispatch(new FetchCats(cats));

            this.loadingStateChanged.emit(true);
          });
      }
    );
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }
}
