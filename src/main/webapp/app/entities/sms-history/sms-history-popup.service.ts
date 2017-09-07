import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { SmsHistory } from './sms-history.model';
import { SmsHistoryService } from './sms-history.service';

@Injectable()
export class SmsHistoryPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private smsHistoryService: SmsHistoryService

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
                this.smsHistoryService.find(id).subscribe((smsHistory) => {
                    smsHistory.tglInput = this.datePipe
                        .transform(smsHistory.tglInput, 'yyyy-MM-ddTHH:mm:ss');
                    smsHistory.tglSms = this.datePipe
                        .transform(smsHistory.tglSms, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.smsHistoryModalRef(component, smsHistory);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.smsHistoryModalRef(component, new SmsHistory());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    smsHistoryModalRef(component: Component, smsHistory: SmsHistory): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.smsHistory = smsHistory;
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
