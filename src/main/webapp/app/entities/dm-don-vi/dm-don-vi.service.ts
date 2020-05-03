import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDmDonVi } from 'app/shared/model/dm-don-vi.model';

type EntityResponseType = HttpResponse<IDmDonVi>;
type EntityArrayResponseType = HttpResponse<IDmDonVi[]>;

@Injectable({ providedIn: 'root' })
export class DmDonViService {
  public resourceUrl = SERVER_API_URL + 'api/dm-don-vis';

  constructor(protected http: HttpClient) {}

  create(dmDonVi: IDmDonVi): Observable<EntityResponseType> {
    return this.http.post<IDmDonVi>(this.resourceUrl, dmDonVi, { observe: 'response' });
  }

  update(dmDonVi: IDmDonVi): Observable<EntityResponseType> {
    return this.http.put<IDmDonVi>(this.resourceUrl, dmDonVi, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IDmDonVi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDmDonVi[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
