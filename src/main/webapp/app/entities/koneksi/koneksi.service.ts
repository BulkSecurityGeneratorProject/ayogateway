import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Koneksi } from './koneksi.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class KoneksiService {

    private resourceUrl = 'ayoapp/api/koneksis';
    private resourceSearchUrl = 'ayoapp/api/_search/koneksis';

    constructor(private http: Http) { }

    create(koneksi: Koneksi): Observable<Koneksi> {
        const copy = this.convert(koneksi);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(koneksi: Koneksi): Observable<Koneksi> {
        const copy = this.convert(koneksi);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Koneksi> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(koneksi: Koneksi): Koneksi {
        const copy: Koneksi = Object.assign({}, koneksi);
        return copy;
    }
}
