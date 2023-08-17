import { Component, Input, OnInit } from '@angular/core';
import { ICat } from '../../models/cat';
import { Select, Store } from '@ngxs/store';
import { CatState } from 'src/app/store/cat.state';
import { Observable } from 'rxjs';
import { CatApiService } from 'src/app/services/cat-api.service';
import { FetchCats } from 'src/app/store/cat.actions';

@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.scss'],
})
export class CatsListComponent implements OnInit {
  @Select(CatState.sortedCats) cats$!: Observable<ICat[]>;
  @Input() isLoading = false;

  constructor(
    private catApiService: CatApiService,
    private store: Store
  ) {}

  ngOnInit() {
    this.catApiService.fetchCatsFromApi('10', 'all').subscribe(cats => {
      this.store.dispatch(new FetchCats(cats));
      this.isLoading = true;
    });
  }
}
