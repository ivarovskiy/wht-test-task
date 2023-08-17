import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ICat } from 'src/app/models/cat';
import { CatApiService } from 'src/app/services/cat-api.service';

@Component({
  selector: 'app-cat-details',
  templateUrl: './cat-details.component.html',
  styleUrls: ['./cat-details.component.scss'],
})
export class CatDetailsComponent implements OnInit {
  cat$: Observable<ICat | null> | undefined;
  countryFlag = '';
  wikiLink = '';

  constructor(
    private catApiService: CatApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.cat$ = this.route.paramMap.pipe(
      switchMap(params => {
        const catId = params.get('id');
        return this.catApiService.getCatById(catId);
      }),
      tap(cat => {
        if (cat && cat.breeds.length > 0) {
          this.countryFlag = `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/1x1/${cat.breeds[0].country_code.toLowerCase()}.svg`;
          this.wikiLink = cat.breeds[0].wikipedia_url;
        }
      })
    );
  }

  redirectToWikipedia() {
    window.location.href = this.wikiLink;
  }

  goBack() {
    this.router.navigate(['']);
  }
}
