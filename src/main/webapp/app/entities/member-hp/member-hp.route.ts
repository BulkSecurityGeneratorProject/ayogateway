import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MemberHpComponent } from './member-hp.component';
import { MemberHpDetailComponent } from './member-hp-detail.component';
import { MemberHpPopupComponent } from './member-hp-dialog.component';
import { MemberHpDeletePopupComponent } from './member-hp-delete-dialog.component';

@Injectable()
export class MemberHpResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const memberHpRoute: Routes = [
    {
        path: 'member-hp',
        component: MemberHpComponent,
        resolve: {
            'pagingParams': MemberHpResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.memberHp.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'member-hp/:id',
        component: MemberHpDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.memberHp.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const memberHpPopupRoute: Routes = [
    {
        path: 'member-hp-new',
        component: MemberHpPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.memberHp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'member-hp/:id/edit',
        component: MemberHpPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.memberHp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'member-hp/:id/delete',
        component: MemberHpDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.memberHp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
