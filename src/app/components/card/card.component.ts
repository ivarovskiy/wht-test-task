import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { ICat, ICatBreed } from 'src/app/models/cat';
import { ToggleFavorite } from 'src/app/store/cat.actions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() cat: ICat = {
    id: '',
    url: '',
    breeds: [],
    width: 0,
    height: 0,
    favorite: false,
  };

  constructor(private store: Store) {}

  get breeds(): ICatBreed[] {
    return this.cat.breeds;
  }

  toggleFavorite(cat: ICat) {
    this.store.dispatch(new ToggleFavorite(cat));
  }
}
