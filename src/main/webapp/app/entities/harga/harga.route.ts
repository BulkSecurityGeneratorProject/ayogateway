import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { HargaComponent } from './harga.component';
import { HargaDetailComponent } from './harga-detail.component';
import { HargaPopupComponent } from './harga-dialog.component';
import { HargaDeletePopupComponent } from './harga-delete-dialog.component';

@Injectable()
export class HargaResolvePagingParams implements Resolve<any> {

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

export const hargaRoute: Routes = [
    {
        path: 'harga',
        component: HargaComponent,
        resolve: {
            'pagingParams': HargaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.harga.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'harga/:id',
        component: HargaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.harga.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hargaPopupRoute: Routes = [
    {
        path: 'harga-new',
        component: HargaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.harga.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'harga/:id/edit',
        component: HargaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.harga.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'harga/:id/delete',
        component: HargaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.harga.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
