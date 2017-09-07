import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Produk } from './produk.model';
import { ProdukService } from './produk.service';

@Component({
    selector: 'jhi-produk-detail',
    templateUrl: './produk-detail.component.html'
})
export class ProdukDetailComponent implements OnInit, OnDestroy {

    produk: Produk;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private produkService: ProdukService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProduks();
    }

    load(id) {
        this.produkService.find(id).subscribe((produk) => {
            this.produk = produk;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProduks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'produkListModification',
            (response) => this.load(this.produk.id)
        );
    }
}
