import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Distributor } from './distributor.model';
import { DistributorService } from './distributor.service';

@Component({
    selector: 'jhi-distributor-detail',
    templateUrl: './distributor-detail.component.html'
})
export class DistributorDetailComponent implements OnInit, OnDestroy {

    distributor: Distributor;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private distributorService: DistributorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDistributors();
    }

    load(id) {
        this.distributorService.find(id).subscribe((distributor) => {
            this.distributor = distributor;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDistributors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'distributorListModification',
            (response) => this.load(this.distributor.id)
        );
    }
}
