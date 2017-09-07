import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Transaksi } from './transaksi.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TransaksiService {

    private resourceUrl = 'ayoapp/api/transaksis';
    private resourceSearchUrl = 'ayoapp/api/_search/transaksis';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(transaksi: Transaksi): Observable<Transaksi> {
        const copy = this.convert(transaksi);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(transaksi: Transaksi): Observable<Transaksi> {
        const copy = this.convert(transaksi);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Transaksi> {
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
        entity.tglTransaksi = this.dateUtils
            .convertDateTimeFromServer(entity.tglTransaksi);
        entity.tglInput = this.dateUtils
            .convertDateTimeFromServer(entity.tglInput);
    }

    private convert(transaksi: Transaksi): Transaksi {
        const copy: Transaksi = Object.assign({}, transaksi);

        copy.tglTransaksi = this.dateUtils.toDate(transaksi.tglTransaksi);

        copy.tglInput = this.dateUtils.toDate(transaksi.tglInput);
        return copy;
    }
}
