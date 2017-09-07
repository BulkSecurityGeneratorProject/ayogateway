import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { LevelMember } from './level-member.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LevelMemberService {

    private resourceUrl = 'ayoapp/api/level-members';
    private resourceSearchUrl = 'ayoapp/api/_search/level-members';

    constructor(private http: Http) { }

    create(levelMember: LevelMember): Observable<LevelMember> {
        const copy = this.convert(levelMember);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(levelMember: LevelMember): Observable<LevelMember> {
        const copy = this.convert(levelMember);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<LevelMember> {
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

    private convert(levelMember: LevelMember): LevelMember {
        const copy: LevelMember = Object.assign({}, levelMember);
        return copy;
    }
}
