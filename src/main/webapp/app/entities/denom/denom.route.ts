import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DenomComponent } from './denom.component';
import { DenomDetailComponent } from './denom-detail.component';
import { DenomPopupComponent } from './denom-dialog.component';
import { DenomDeletePopupComponent } from './denom-delete-dialog.component';

@Injectable()
export class DenomResolvePagingParams implements Resolve<any> {

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

export const denomRoute: Routes = [
    {
        path: 'denom',
        component: DenomComponent,
        resolve: {
            'pagingParams': DenomResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.denom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'denom/:id',
        component: DenomDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.denom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const denomPopupRoute: Routes = [
    {
        path: 'denom-new',
        component: DenomPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.denom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'denom/:id/edit',
        component: DenomPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.denom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'denom/:id/delete',
        component: DenomDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.denom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
