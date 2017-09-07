import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AyogatewaySharedModule } from '../../shared';
import {
    KoneksiService,
    KoneksiPopupService,
    KoneksiComponent,
    KoneksiDetailComponent,
    KoneksiDialogComponent,
    KoneksiPopupComponent,
    KoneksiDeletePopupComponent,
    KoneksiDeleteDialogComponent,
    koneksiRoute,
    koneksiPopupRoute,
    KoneksiResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...koneksiRoute,
    ...koneksiPopupRoute,
];

@NgModule({
    imports: [
        AyogatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        KoneksiComponent,
        KoneksiDetailComponent,
        KoneksiDialogComponent,
        KoneksiDeleteDialogComponent,
        KoneksiPopupComponent,
        KoneksiDeletePopupComponent,
    ],
    entryComponents: [
        KoneksiComponent,
        KoneksiDialogComponent,
        KoneksiPopupComponent,
        KoneksiDeleteDialogComponent,
        KoneksiDeletePopupComponent,
    ],
    providers: [
        KoneksiService,
        KoneksiPopupService,
        KoneksiResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AyogatewayKoneksiModule {}
