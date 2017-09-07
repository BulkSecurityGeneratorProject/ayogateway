import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Transaksi } from './transaksi.model';
import { TransaksiService } from './transaksi.service';

@Injectable()
export class TransaksiPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private transaksiService: TransaksiService

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
                this.transaksiService.find(id).subscribe((transaksi) => {
                    transaksi.tglTransaksi = this.datePipe
                        .transform(transaksi.tglTransaksi, 'yyyy-MM-ddTHH:mm:ss');
                    transaksi.tglInput = this.datePipe
                        .transform(transaksi.tglInput, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.transaksiModalRef(component, transaksi);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.transaksiModalRef(component, new Transaksi());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    transaksiModalRef(component: Component, transaksi: Transaksi): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.transaksi = transaksi;
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
