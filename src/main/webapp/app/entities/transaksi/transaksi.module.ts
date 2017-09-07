import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AyogatewaySharedModule } from '../../shared';
import {
    TransaksiService,
    TransaksiPopupService,
    TransaksiComponent,
    TransaksiDetailComponent,
    TransaksiDialogComponent,
    TransaksiPopupComponent,
    TransaksiDeletePopupComponent,
    TransaksiDeleteDialogComponent,
    transaksiRoute,
    transaksiPopupRoute,
    TransaksiResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...transaksiRoute,
    ...transaksiPopupRoute,
];

@NgModule({
    imports: [
        AyogatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TransaksiComponent,
        TransaksiDetailComponent,
        TransaksiDialogComponent,
        TransaksiDeleteDialogComponent,
        TransaksiPopupComponent,
        TransaksiDeletePopupComponent,
    ],
    entryComponents: [
        TransaksiComponent,
        TransaksiDialogComponent,
        TransaksiPopupComponent,
        TransaksiDeleteDialogComponent,
        TransaksiDeletePopupComponent,
    ],
    providers: [
        TransaksiService,
        TransaksiPopupService,
        TransaksiResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AyogatewayTransaksiModule {}
