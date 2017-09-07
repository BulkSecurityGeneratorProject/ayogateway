import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AyogatewaySharedModule } from '../../shared';
import {
    DenomService,
    DenomPopupService,
    DenomComponent,
    DenomDetailComponent,
    DenomDialogComponent,
    DenomPopupComponent,
    DenomDeletePopupComponent,
    DenomDeleteDialogComponent,
    denomRoute,
    denomPopupRoute,
    DenomResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...denomRoute,
    ...denomPopupRoute,
];

@NgModule({
    imports: [
        AyogatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DenomComponent,
        DenomDetailComponent,
        DenomDialogComponent,
        DenomDeleteDialogComponent,
        DenomPopupComponent,
        DenomDeletePopupComponent,
    ],
    entryComponents: [
        DenomComponent,
        DenomDialogComponent,
        DenomPopupComponent,
        DenomDeleteDialogComponent,
        DenomDeletePopupComponent,
    ],
    providers: [
        DenomService,
        DenomPopupService,
        DenomResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AyogatewayDenomModule {}
