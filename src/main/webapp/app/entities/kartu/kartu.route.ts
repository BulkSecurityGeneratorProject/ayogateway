import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { KartuComponent } from './kartu.component';
import { KartuDetailComponent } from './kartu-detail.component';
import { KartuPopupComponent } from './kartu-dialog.component';
import { KartuDeletePopupComponent } from './kartu-delete-dialog.component';

@Injectable()
export class KartuResolvePagingParams implements Resolve<any> {

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

export const kartuRoute: Routes = [
    {
        path: 'kartu',
        component: KartuComponent,
        resolve: {
            'pagingParams': KartuResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.kartu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'kartu/:id',
        component: KartuDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.kartu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const kartuPopupRoute: Routes = [
    {
        path: 'kartu-new',
        component: KartuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.kartu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'kartu/:id/edit',
        component: KartuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.kartu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'kartu/:id/delete',
        component: KartuDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.kartu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
