import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TransaksiComponent } from './transaksi.component';
import { TransaksiDetailComponent } from './transaksi-detail.component';
import { TransaksiPopupComponent } from './transaksi-dialog.component';
import { TransaksiDeletePopupComponent } from './transaksi-delete-dialog.component';

@Injectable()
export class TransaksiResolvePagingParams implements Resolve<any> {

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

export const transaksiRoute: Routes = [
    {
        path: 'transaksi',
        component: TransaksiComponent,
        resolve: {
            'pagingParams': TransaksiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.transaksi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'transaksi/:id',
        component: TransaksiDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.transaksi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transaksiPopupRoute: Routes = [
    {
        path: 'transaksi-new',
        component: TransaksiPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.transaksi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transaksi/:id/edit',
        component: TransaksiPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.transaksi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transaksi/:id/delete',
        component: TransaksiDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.transaksi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
