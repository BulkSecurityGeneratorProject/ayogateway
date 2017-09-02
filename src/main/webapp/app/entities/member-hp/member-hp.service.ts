import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { MemberHp } from './member-hp.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MemberHpService {

    private resourceUrl = 'ayoapp/api/member-hps';
    private resourceSearchUrl = 'ayoapp/api/_search/member-hps';

    constructor(private http: Http) { }

    create(memberHp: MemberHp): Observable<MemberHp> {
        const copy = this.convert(memberHp);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(memberHp: MemberHp): Observable<MemberHp> {
        const copy = this.convert(memberHp);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<MemberHp> {
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

    private convert(memberHp: MemberHp): MemberHp {
        const copy: MemberHp = Object.assign({}, memberHp);
        return copy;
    }
}
