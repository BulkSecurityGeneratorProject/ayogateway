import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AyogatewaySharedModule } from '../../shared';
import {
    ProdukService,
    ProdukPopupService,
    ProdukComponent,
    ProdukDetailComponent,
    ProdukDialogComponent,
    ProdukPopupComponent,
    ProdukDeletePopupComponent,
    ProdukDeleteDialogComponent,
    produkRoute,
    produkPopupRoute,
    ProdukResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...produkRoute,
    ...produkPopupRoute,
];

@NgModule({
    imports: [
        AyogatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProdukComponent,
        ProdukDetailComponent,
        ProdukDialogComponent,
        ProdukDeleteDialogComponent,
        ProdukPopupComponent,
        ProdukDeletePopupComponent,
    ],
    entryComponents: [
        ProdukComponent,
        ProdukDialogComponent,
        ProdukPopupComponent,
        ProdukDeleteDialogComponent,
        ProdukDeletePopupComponent,
    ],
    providers: [
        ProdukService,
        ProdukPopupService,
        ProdukResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AyogatewayProdukModule {}
