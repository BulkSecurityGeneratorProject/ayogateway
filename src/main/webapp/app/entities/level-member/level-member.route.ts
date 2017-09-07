import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LevelMemberComponent } from './level-member.component';
import { LevelMemberDetailComponent } from './level-member-detail.component';
import { LevelMemberPopupComponent } from './level-member-dialog.component';
import { LevelMemberDeletePopupComponent } from './level-member-delete-dialog.component';

@Injectable()
export class LevelMemberResolvePagingParams implements Resolve<any> {

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

export const levelMemberRoute: Routes = [
    {
        path: 'level-member',
        component: LevelMemberComponent,
        resolve: {
            'pagingParams': LevelMemberResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.levelMember.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'level-member/:id',
        component: LevelMemberDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.levelMember.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const levelMemberPopupRoute: Routes = [
    {
        path: 'level-member-new',
        component: LevelMemberPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.levelMember.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'level-member/:id/edit',
        component: LevelMemberPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.levelMember.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'level-member/:id/delete',
        component: LevelMemberDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ayogatewayApp.levelMember.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
