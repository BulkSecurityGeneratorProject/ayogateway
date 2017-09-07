import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { LogSaldo } from './log-saldo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LogSaldoService {

    private resourceUrl = 'ayoapp/api/log-saldos';
    private resourceSearchUrl = 'ayoapp/api/_search/log-saldos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(logSaldo: LogSaldo): Observable<LogSaldo> {
        const copy = this.convert(logSaldo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(logSaldo: LogSaldo): Observable<LogSaldo> {
        const copy = this.convert(logSaldo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<LogSaldo> {
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
        entity.tgl = this.dateUtils
            .convertDateTimeFromServer(entity.tgl);
    }

    private convert(logSaldo: LogSaldo): LogSaldo {
        const copy: LogSaldo = Object.assign({}, logSaldo);

        copy.tgl = this.dateUtils.toDate(logSaldo.tgl);
        return copy;
    }
}
