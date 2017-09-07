import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AyogatewaySharedModule } from '../../shared';
import {
    LevelMemberService,
    LevelMemberPopupService,
    LevelMemberComponent,
    LevelMemberDetailComponent,
    LevelMemberDialogComponent,
    LevelMemberPopupComponent,
    LevelMemberDeletePopupComponent,
    LevelMemberDeleteDialogComponent,
    levelMemberRoute,
    levelMemberPopupRoute,
    LevelMemberResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...levelMemberRoute,
    ...levelMemberPopupRoute,
];

@NgModule({
    imports: [
        AyogatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LevelMemberComponent,
        LevelMemberDetailComponent,
        LevelMemberDialogComponent,
        LevelMemberDeleteDialogComponent,
        LevelMemberPopupComponent,
        LevelMemberDeletePopupComponent,
    ],
    entryComponents: [
        LevelMemberComponent,
        LevelMemberDialogComponent,
        LevelMemberPopupComponent,
        LevelMemberDeleteDialogComponent,
        LevelMemberDeletePopupComponent,
    ],
    providers: [
        LevelMemberService,
        LevelMemberPopupService,
        LevelMemberResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AyogatewayLevelMemberModule {}
