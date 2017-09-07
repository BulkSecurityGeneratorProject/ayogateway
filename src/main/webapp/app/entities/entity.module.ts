import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AyogatewayMemberModule } from './member/member.module';
import { AyogatewayMemberHpModule } from './member-hp/member-hp.module';
import { AyogatewayDenomModule } from './denom/denom.module';
import { AyogatewayDistributorModule } from './distributor/distributor.module';
import { AyogatewayHargaModule } from './harga/harga.module';
import { AyogatewayKartuModule } from './kartu/kartu.module';
import { AyogatewayKoneksiModule } from './koneksi/koneksi.module';
import { AyogatewayLevelMemberModule } from './level-member/level-member.module';
import { AyogatewayLogSaldoModule } from './log-saldo/log-saldo.module';
import { AyogatewayOperatorModule } from './operator/operator.module';
import { AyogatewayProdukModule } from './produk/produk.module';
import { AyogatewayRebateModule } from './rebate/rebate.module';
import { AyogatewaySmsHistoryModule } from './sms-history/sms-history.module';
import { AyogatewayTransaksiModule } from './transaksi/transaksi.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AyogatewayMemberModule,
        AyogatewayMemberHpModule,
        AyogatewayDenomModule,
        AyogatewayDistributorModule,
        AyogatewayHargaModule,
        AyogatewayKartuModule,
        AyogatewayKoneksiModule,
        AyogatewayLevelMemberModule,
        AyogatewayLogSaldoModule,
        AyogatewayOperatorModule,
        AyogatewayProdukModule,
        AyogatewayRebateModule,
        AyogatewaySmsHistoryModule,
        AyogatewayTransaksiModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AyogatewayEntityModule {}
