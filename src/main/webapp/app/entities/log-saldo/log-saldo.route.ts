import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LogSaldoComponent } from './log-saldo.component';
import { LogSaldoDetailComponent } from './log-saldo-detail.component';
import { LogSaldoPopupComponent } from './log-saldo-dialog.component';
import { LogSaldoDeletePopupComponent } from './log-saldo-delete-dialog.component';

@Injectable()
export class LogSaldoResolvePagingParams implements Resolve<any> {

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

export const logSaldoRoute: Routes = [
    {
        path: 'log-saldo',
        component: LogSaldoComponent,
        resolve: {
            'pagingParams': LogSaldoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.logSaldo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'log-saldo/:id',
        component: LogSaldoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.logSaldo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const logSaldoPopupRoute: Routes = [
    {
        path: 'log-saldo-new',
        component: LogSaldoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.logSaldo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'log-saldo/:id/edit',
        component: LogSaldoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.logSaldo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'log-saldo/:id/delete',
        component: LogSaldoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.logSaldo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
