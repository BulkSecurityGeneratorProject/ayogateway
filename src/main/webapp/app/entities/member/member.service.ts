import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Member } from './member.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MemberService {

    private resourceUrl = 'ayoapp/api/members';
    private resourceSearchUrl = 'ayoapp/api/_search/members';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(member: Member): Observable<Member> {
        const copy = this.convert(member);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(member: Member): Observable<Member> {
        const copy = this.convert(member);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Member> {
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
        entity.tglRegister = this.dateUtils
            .convertLocalDateFromServer(entity.tglRegister);
        entity.tglInput = this.dateUtils
            .convertDateTimeFromServer(entity.tglInput);
        entity.tglUpdate = this.dateUtils
            .convertDateTimeFromServer(entity.tglUpdate);
        entity.lastTrx = this.dateUtils
            .convertDateTimeFromServer(entity.lastTrx);
    }

    private convert(member: Member): Member {
        const copy: Member = Object.assign({}, member);
        copy.tglRegister = this.dateUtils
            .convertLocalDateToServer(member.tglRegister);

        copy.tglInput = this.dateUtils.toDate(member.tglInput);

        copy.tglUpdate = this.dateUtils.toDate(member.tglUpdate);

        copy.lastTrx = this.dateUtils.toDate(member.lastTrx);
        return copy;
    }
}
