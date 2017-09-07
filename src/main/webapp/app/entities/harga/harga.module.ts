import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AyogatewaySharedModule } from '../../shared';
import {
    HargaService,
    HargaPopupService,
    HargaComponent,
    HargaDetailComponent,
    HargaDialogComponent,
    HargaPopupComponent,
    HargaDeletePopupComponent,
    HargaDeleteDialogComponent,
    hargaRoute,
    hargaPopupRoute,
    HargaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...hargaRoute,
    ...hargaPopupRoute,
];

@NgModule({
    imports: [
        AyogatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        HargaComponent,
        HargaDetailComponent,
        HargaDialogComponent,
        HargaDeleteDialogComponent,
        HargaPopupComponent,
        HargaDeletePopupComponent,
    ],
    entryComponents: [
        HargaComponent,
        HargaDialogComponent,
        HargaPopupComponent,
        HargaDeleteDialogComponent,
        HargaDeletePopupComponent,
    ],
    providers: [
        HargaService,
        HargaPopupService,
        HargaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AyogatewayHargaModule {}
