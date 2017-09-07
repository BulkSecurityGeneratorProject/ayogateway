import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Koneksi } from './koneksi.model';
import { KoneksiService } from './koneksi.service';

@Component({
    selector: 'jhi-koneksi-detail',
    templateUrl: './koneksi-detail.component.html'
})
export class KoneksiDetailComponent implements OnInit, OnDestroy {

    koneksi: Koneksi;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private koneksiService: KoneksiService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInKoneksis();
    }

    load(id) {
        this.koneksiService.find(id).subscribe((koneksi) => {
            this.koneksi = koneksi;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInKoneksis() {
        this.eventSubscriber = this.eventManager.subscribe(
            'koneksiListModification',
            (response) => this.load(this.koneksi.id)
        );
    }
}
