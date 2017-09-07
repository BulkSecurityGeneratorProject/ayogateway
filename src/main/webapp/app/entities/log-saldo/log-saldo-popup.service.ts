import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { LogSaldo } from './log-saldo.model';
import { LogSaldoService } from './log-saldo.service';

@Injectable()
export class LogSaldoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private logSaldoService: LogSaldoService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.logSaldoService.find(id).subscribe((logSaldo) => {
                    logSaldo.tgl = this.datePipe
                        .transform(logSaldo.tgl, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.logSaldoModalRef(component, logSaldo);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.logSaldoModalRef(component, new LogSaldo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    logSaldoModalRef(component: Component, logSaldo: LogSaldo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.logSaldo = logSaldo;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
