import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AyogatewaySharedModule } from '../../shared';
import {
    MemberHpService,
    MemberHpPopupService,
    MemberHpComponent,
    MemberHpDetailComponent,
    MemberHpDialogComponent,
    MemberHpPopupComponent,
    MemberHpDeletePopupComponent,
    MemberHpDeleteDialogComponent,
    memberHpRoute,
    memberHpPopupRoute,
    MemberHpResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...memberHpRoute,
    ...memberHpPopupRoute,
];

@NgModule({
    imports: [
        AyogatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MemberHpComponent,
        MemberHpDetailComponent,
        MemberHpDialogComponent,
        MemberHpDeleteDialogComponent,
        MemberHpPopupComponent,
        MemberHpDeletePopupComponent,
    ],
    entryComponents: [
        MemberHpComponent,
        MemberHpDialogComponent,
        MemberHpPopupComponent,
        MemberHpDeleteDialogComponent,
        MemberHpDeletePopupComponent,
    ],
    providers: [
        MemberHpService,
        MemberHpPopupService,
        MemberHpResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AyogatewayMemberHpModule {}
