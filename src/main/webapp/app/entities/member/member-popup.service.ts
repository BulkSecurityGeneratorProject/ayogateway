import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Member } from './member.model';
import { MemberService } from './member.service';

@Injectable()
export class MemberPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private memberService: MemberService

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
                this.memberService.find(id).subscribe((member) => {
                    if (member.tglRegister) {
                        member.tglRegister = {
                            year: member.tglRegister.getFullYear(),
                            month: member.tglRegister.getMonth() + 1,
                            day: member.tglRegister.getDate()
                        };
                    }
                    member.tglInput = this.datePipe
                        .transform(member.tglInput, 'yyyy-MM-ddTHH:mm:ss');
                    member.tglUpdate = this.datePipe
                        .transform(member.tglUpdate, 'yyyy-MM-ddTHH:mm:ss');
                    member.lastTrx = this.datePipe
                        .transform(member.lastTrx, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.memberModalRef(component, member);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.memberModalRef(component, new Member());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    memberModalRef(component: Component, member: Member): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.member = member;
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
