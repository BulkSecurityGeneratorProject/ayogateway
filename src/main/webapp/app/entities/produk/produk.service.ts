import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Produk } from './produk.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProdukService {

    private resourceUrl = 'ayoapp/api/produks';
    private resourceSearchUrl = 'ayoapp/api/_search/produks';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(produk: Produk): Observable<Produk> {
        const copy = this.convert(produk);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(produk: Produk): Observable<Produk> {
        const copy = this.convert(produk);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Produk> {
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
        entity.tglUpdate = this.dateUtils
            .convertDateTimeFromServer(entity.tglUpdate);
    }

    private convert(produk: Produk): Produk {
        const copy: Produk = Object.assign({}, produk);

        copy.tglUpdate = this.dateUtils.toDate(produk.tglUpdate);
        return copy;
    }
}
