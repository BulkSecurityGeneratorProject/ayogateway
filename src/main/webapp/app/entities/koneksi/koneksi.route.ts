import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { KoneksiComponent } from './koneksi.component';
import { KoneksiDetailComponent } from './koneksi-detail.component';
import { KoneksiPopupComponent } from './koneksi-dialog.component';
import { KoneksiDeletePopupComponent } from './koneksi-delete-dialog.component';

@Injectable()
export class KoneksiResolvePagingParams implements Resolve<any> {

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

export const koneksiRoute: Routes = [
    {
        path: 'koneksi',
        component: KoneksiComponent,
        resolve: {
            'pagingParams': KoneksiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.koneksi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'koneksi/:id',
        component: KoneksiDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.koneksi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const koneksiPopupRoute: Routes = [
    {
        path: 'koneksi-new',
        component: KoneksiPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.koneksi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'koneksi/:id/edit',
        component: KoneksiPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.koneksi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'koneksi/:id/delete',
        component: KoneksiDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.koneksi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
