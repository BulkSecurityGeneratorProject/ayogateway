import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Harga } from './harga.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class HargaService {

    private resourceUrl = 'ayoapp/api/hargas';
    private resourceSearchUrl = 'ayoapp/api/_search/hargas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(harga: Harga): Observable<Harga> {
        const copy = this.convert(harga);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(harga: Harga): Observable<Harga> {
        const copy = this.convert(harga);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Harga> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
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
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.tglInput = this.dateUtils
            .convertDateTimeFromServer(entity.tglInput);
    }

    private convert(harga: Harga): Harga {
        const copy: Harga = Object.assign({}, harga);

        copy.tglInput = this.dateUtils.toDate(harga.tglInput);
        return copy;
    }
}
