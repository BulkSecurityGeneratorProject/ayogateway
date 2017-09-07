import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Harga } from './harga.model';
import { HargaService } from './harga.service';

@Component({
    selector: 'jhi-harga-detail',
    templateUrl: './harga-detail.component.html'
})
export class HargaDetailComponent implements OnInit, OnDestroy {

    harga: Harga;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private hargaService: HargaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHargas();
    }

    load(id) {
        this.hargaService.find(id).subscribe((harga) => {
            this.harga = harga;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHargas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'hargaListModification',
            (response) => this.load(this.harga.id)
        );
    }
}
