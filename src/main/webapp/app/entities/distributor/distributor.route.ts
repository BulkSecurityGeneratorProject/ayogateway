import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DistributorComponent } from './distributor.component';
import { DistributorDetailComponent } from './distributor-detail.component';
import { DistributorPopupComponent } from './distributor-dialog.component';
import { DistributorDeletePopupComponent } from './distributor-delete-dialog.component';

@Injectable()
export class DistributorResolvePagingParams implements Resolve<any> {

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

export const distributorRoute: Routes = [
    {
        path: 'distributor',
        component: DistributorComponent,
        resolve: {
            'pagingParams': DistributorResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.distributor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'distributor/:id',
        component: DistributorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.distributor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const distributorPopupRoute: Routes = [
    {
        path: 'distributor-new',
        component: DistributorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.distributor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'distributor/:id/edit',
        component: DistributorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.distributor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'distributor/:id/delete',
        component: DistributorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.distributor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
