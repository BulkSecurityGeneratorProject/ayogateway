import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Kartu } from './kartu.model';
import { KartuService } from './kartu.service';

@Component({
    selector: 'jhi-kartu-detail',
    templateUrl: './kartu-detail.component.html'
})
export class KartuDetailComponent implements OnInit, OnDestroy {

    kartu: Kartu;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private kartuService: KartuService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInKartus();
    }

    load(id) {
        this.kartuService.find(id).subscribe((kartu) => {
            this.kartu = kartu;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInKartus() {
        this.eventSubscriber = this.eventManager.subscribe(
            'kartuListModification',
            (response) => this.load(this.kartu.id)
        );
    }
}
