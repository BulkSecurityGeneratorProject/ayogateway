/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AyogatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LevelMemberDetailComponent } from '../../../../../../main/webapp/app/entities/level-member/level-member-detail.component';
import { LevelMemberService } from '../../../../../../main/webapp/app/entities/level-member/level-member.service';
import { LevelMember } from '../../../../../../main/webapp/app/entities/level-member/level-member.model';

describe('Component Tests', () => {

    describe('LevelMember Management Detail Component', () => {
        let comp: LevelMemberDetailComponent;
        let fixture: ComponentFixture<LevelMemberDetailComponent>;
        let service: LevelMemberService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AyogatewayTestModule],
                declarations: [LevelMemberDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LevelMemberService,
                    JhiEventManager
                ]
            }).overrideTemplate(LevelMemberDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LevelMemberDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LevelMemberService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new LevelMember(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.levelMember).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
