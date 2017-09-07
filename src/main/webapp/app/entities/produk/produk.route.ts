import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProdukComponent } from './produk.component';
import { ProdukDetailComponent } from './produk-detail.component';
import { ProdukPopupComponent } from './produk-dialog.component';
import { ProdukDeletePopupComponent } from './produk-delete-dialog.component';

@Injectable()
export class ProdukResolvePagingParams implements Resolve<any> {

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

export const produkRoute: Routes = [
    {
        path: 'produk',
        component: ProdukComponent,
        resolve: {
            'pagingParams': ProdukResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.produk.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'produk/:id',
        component: ProdukDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.produk.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const produkPopupRoute: Routes = [
    {
        path: 'produk-new',
        component: ProdukPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.produk.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'produk/:id/edit',
        component: ProdukPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.produk.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'produk/:id/delete',
        component: ProdukDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.produk.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
