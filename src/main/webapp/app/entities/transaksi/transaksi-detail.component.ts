import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Transaksi } from './transaksi.model';
import { TransaksiService } from './transaksi.service';

@Component({
    selector: 'jhi-transaksi-detail',
    templateUrl: './transaksi-detail.component.html'
})
export class TransaksiDetailComponent implements OnInit, OnDestroy {

    transaksi: Transaksi;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private transaksiService: TransaksiService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTransaksis();
    }

    load(id) {
        this.transaksiService.find(id).subscribe((transaksi) => {
            this.transaksi = transaksi;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTransaksis() {
        this.eventSubscriber = this.eventManager.subscribe(
            'transaksiListModification',
            (response) => this.load(this.transaksi.id)
        );
    }
}
