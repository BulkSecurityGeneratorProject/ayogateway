import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Distributor } from './distributor.model';
import { DistributorService } from './distributor.service';

@Injectable()
export class DistributorPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private distributorService: DistributorService

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
                this.distributorService.find(id).subscribe((distributor) => {
                    distributor.tglInput = this.datePipe
                        .transform(distributor.tglInput, 'yyyy-MM-ddTHH:mm:ss');
                    distributor.tglUpdate = this.datePipe
                        .transform(distributor.tglUpdate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.distributorModalRef(component, distributor);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.distributorModalRef(component, new Distributor());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    distributorModalRef(component: Component, distributor: Distributor): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.distributor = distributor;
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
