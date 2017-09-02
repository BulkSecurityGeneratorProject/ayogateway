/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AyogatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MemberHpDetailComponent } from '../../../../../../main/webapp/app/entities/member-hp/member-hp-detail.component';
import { MemberHpService } from '../../../../../../main/webapp/app/entities/member-hp/member-hp.service';
import { MemberHp } from '../../../../../../main/webapp/app/entities/member-hp/member-hp.model';

describe('Component Tests', () => {

    describe('MemberHp Management Detail Component', () => {
        let comp: MemberHpDetailComponent;
        let fixture: ComponentFixture<MemberHpDetailComponent>;
        let service: MemberHpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AyogatewayTestModule],
                declarations: [MemberHpDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MemberHpService,
                    JhiEventManager
                ]
            }).overrideTemplate(MemberHpDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MemberHpDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MemberHpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MemberHp(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.memberHp).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
