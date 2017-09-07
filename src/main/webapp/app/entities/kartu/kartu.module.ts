import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AyogatewaySharedModule } from '../../shared';
import {
    KartuService,
    KartuPopupService,
    KartuComponent,
    KartuDetailComponent,
    KartuDialogComponent,
    KartuPopupComponent,
    KartuDeletePopupComponent,
    KartuDeleteDialogComponent,
    kartuRoute,
    kartuPopupRoute,
    KartuResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...kartuRoute,
    ...kartuPopupRoute,
];

@NgModule({
    imports: [
        AyogatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        KartuComponent,
        KartuDetailComponent,
        KartuDialogComponent,
        KartuDeleteDialogComponent,
        KartuPopupComponent,
        KartuDeletePopupComponent,
    ],
    entryComponents: [
        KartuComponent,
        KartuDialogComponent,
        KartuPopupComponent,
        KartuDeleteDialogComponent,
        KartuDeletePopupComponent,
    ],
    providers: [
        KartuService,
        KartuPopupService,
        KartuResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AyogatewayKartuModule {}
