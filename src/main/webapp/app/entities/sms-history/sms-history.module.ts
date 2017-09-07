import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AyogatewaySharedModule } from '../../shared';
import {
    SmsHistoryService,
    SmsHistoryPopupService,
    SmsHistoryComponent,
    SmsHistoryDetailComponent,
    SmsHistoryDialogComponent,
    SmsHistoryPopupComponent,
    SmsHistoryDeletePopupComponent,
    SmsHistoryDeleteDialogComponent,
    smsHistoryRoute,
    smsHistoryPopupRoute,
    SmsHistoryResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...smsHistoryRoute,
    ...smsHistoryPopupRoute,
];

@NgModule({
    imports: [
        AyogatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SmsHistoryComponent,
        SmsHistoryDetailComponent,
        SmsHistoryDialogComponent,
        SmsHistoryDeleteDialogComponent,
        SmsHistoryPopupComponent,
        SmsHistoryDeletePopupComponent,
    ],
    entryComponents: [
        SmsHistoryComponent,
        SmsHistoryDialogComponent,
        SmsHistoryPopupComponent,
        SmsHistoryDeleteDialogComponent,
        SmsHistoryDeletePopupComponent,
    ],
    providers: [
        SmsHistoryService,
        SmsHistoryPopupService,
        SmsHistoryResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AyogatewaySmsHistoryModule {}
