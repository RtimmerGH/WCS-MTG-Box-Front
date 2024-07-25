import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../../../backend-endpoints';
import { SearchQuery } from '../../../user-panel/collection/models/search-query.model';
import { HomeCardSearchResult } from '../../models/home-search-results.model';

@Injectable({
    providedIn: 'root',
})
export class HomeSearchRepository {
    private http = inject(HttpClient);
    private homeSearchUrl: string = ENVIRONMENT.apiMarketCardsURL;
    private lastCardsResults = `${ENVIRONMENT.apiLastMarketCardsURL}`;

    public getCards(searchQuery: SearchQuery): Observable<HomeCardSearchResult[]> {
        const params = new HttpParams({ fromObject: searchQuery } as HttpParamsOptions);

        return this.http.get<HomeCardSearchResult[]>(this.homeSearchUrl, { params });
    }

    public getLastCards(limit: number): Observable<HomeCardSearchResult[]> {
        return this.http.get<HomeCardSearchResult[]>(`${this.lastCardsResults}?limit=${limit}`);
    }
}
