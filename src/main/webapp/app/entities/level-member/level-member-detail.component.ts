import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { LevelMember } from './level-member.model';
import { LevelMemberService } from './level-member.service';

@Component({
    selector: 'jhi-level-member-detail',
    templateUrl: './level-member-detail.component.html'
})
export class LevelMemberDetailComponent implements OnInit, OnDestroy {

    levelMember: LevelMember;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private levelMemberService: LevelMemberService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLevelMembers();
    }

    load(id) {
        this.levelMemberService.find(id).subscribe((levelMember) => {
            this.levelMember = levelMember;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLevelMembers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'levelMemberListModification',
            (response) => this.load(this.levelMember.id)
        );
    }
}
