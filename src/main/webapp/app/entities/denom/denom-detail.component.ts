import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Denom } from './denom.model';
import { DenomService } from './denom.service';

@Component({
    selector: 'jhi-denom-detail',
    templateUrl: './denom-detail.component.html'
})
export class DenomDetailComponent implements OnInit, OnDestroy {

    denom: Denom;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private denomService: DenomService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDenoms();
    }

    load(id) {
        this.denomService.find(id).subscribe((denom) => {
            this.denom = denom;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDenoms() {
        this.eventSubscriber = this.eventManager.subscribe(
            'denomListModification',
            (response) => this.load(this.denom.id)
        );
    }
}
