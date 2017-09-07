import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RebateComponent } from './rebate.component';
import { RebateDetailComponent } from './rebate-detail.component';
import { RebatePopupComponent } from './rebate-dialog.component';
import { RebateDeletePopupComponent } from './rebate-delete-dialog.component';

@Injectable()
export class RebateResolvePagingParams implements Resolve<any> {

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

export const rebateRoute: Routes = [
    {
        path: 'rebate',
        component: RebateComponent,
        resolve: {
            'pagingParams': RebateResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.rebate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rebate/:id',
        component: RebateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.rebate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rebatePopupRoute: Routes = [
    {
        path: 'rebate-new',
        component: RebatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.rebate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rebate/:id/edit',
        component: RebatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.rebate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rebate/:id/delete',
        component: RebateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.rebate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
