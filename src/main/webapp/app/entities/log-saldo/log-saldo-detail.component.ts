import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { LogSaldo } from './log-saldo.model';
import { LogSaldoService } from './log-saldo.service';

@Component({
    selector: 'jhi-log-saldo-detail',
    templateUrl: './log-saldo-detail.component.html'
})
export class LogSaldoDetailComponent implements OnInit, OnDestroy {

    logSaldo: LogSaldo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private logSaldoService: LogSaldoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLogSaldos();
    }

    load(id) {
        this.logSaldoService.find(id).subscribe((logSaldo) => {
            this.logSaldo = logSaldo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLogSaldos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'logSaldoListModification',
            (response) => this.load(this.logSaldo.id)
        );
    }
}
