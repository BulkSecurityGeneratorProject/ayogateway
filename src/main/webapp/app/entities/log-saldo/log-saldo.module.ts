import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AyogatewaySharedModule } from '../../shared';
import {
    LogSaldoService,
    LogSaldoPopupService,
    LogSaldoComponent,
    LogSaldoDetailComponent,
    LogSaldoDialogComponent,
    LogSaldoPopupComponent,
    LogSaldoDeletePopupComponent,
    LogSaldoDeleteDialogComponent,
    logSaldoRoute,
    logSaldoPopupRoute,
    LogSaldoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...logSaldoRoute,
    ...logSaldoPopupRoute,
];

@NgModule({
    imports: [
        AyogatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LogSaldoComponent,
        LogSaldoDetailComponent,
        LogSaldoDialogComponent,
        LogSaldoDeleteDialogComponent,
        LogSaldoPopupComponent,
        LogSaldoDeletePopupComponent,
    ],
    entryComponents: [
        LogSaldoComponent,
        LogSaldoDialogComponent,
        LogSaldoPopupComponent,
        LogSaldoDeleteDialogComponent,
        LogSaldoDeletePopupComponent,
    ],
    providers: [
        LogSaldoService,
        LogSaldoPopupService,
        LogSaldoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AyogatewayLogSaldoModule {}
