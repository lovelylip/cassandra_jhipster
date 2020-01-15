import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDmCqbh } from 'app/shared/model/dm-cqbh.model';

type EntityResponseType = HttpResponse<IDmCqbh>;
type EntityArrayResponseType = HttpResponse<IDmCqbh[]>;

@Injectable({ providedIn: 'root' })
export class DmCqbhService {
  public resourceUrl = SERVER_API_URL + 'api/dm-cqbhs';

  constructor(protected http: HttpClient) {}

  create(dmCqbh: IDmCqbh): Observable<EntityResponseType> {
    return this.http.post<IDmCqbh>(this.resourceUrl, dmCqbh, { observe: 'response' });
  }

  update(dmCqbh: IDmCqbh): Observable<EntityResponseType> {
    return this.http.put<IDmCqbh>(this.resourceUrl, dmCqbh, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IDmCqbh>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDmCqbh[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
