import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SmsHistoryComponent } from './sms-history.component';
import { SmsHistoryDetailComponent } from './sms-history-detail.component';
import { SmsHistoryPopupComponent } from './sms-history-dialog.component';
import { SmsHistoryDeletePopupComponent } from './sms-history-delete-dialog.component';

@Injectable()
export class SmsHistoryResolvePagingParams implements Resolve<any> {

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

export const smsHistoryRoute: Routes = [
    {
        path: 'sms-history',
        component: SmsHistoryComponent,
        resolve: {
            'pagingParams': SmsHistoryResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.smsHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sms-history/:id',
        component: SmsHistoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.smsHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const smsHistoryPopupRoute: Routes = [
    {
        path: 'sms-history-new',
        component: SmsHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.smsHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sms-history/:id/edit',
        component: SmsHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.smsHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sms-history/:id/delete',
        component: SmsHistoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.smsHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
