/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AyogatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SmsHistoryDetailComponent } from '../../../../../../main/webapp/app/entities/sms-history/sms-history-detail.component';
import { SmsHistoryService } from '../../../../../../main/webapp/app/entities/sms-history/sms-history.service';
import { SmsHistory } from '../../../../../../main/webapp/app/entities/sms-history/sms-history.model';

describe('Component Tests', () => {

    describe('SmsHistory Management Detail Component', () => {
        let comp: SmsHistoryDetailComponent;
        let fixture: ComponentFixture<SmsHistoryDetailComponent>;
        let service: SmsHistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AyogatewayTestModule],
                declarations: [SmsHistoryDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SmsHistoryService,
                    JhiEventManager
                ]
            }).overrideTemplate(SmsHistoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SmsHistoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SmsHistoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new SmsHistory(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.smsHistory).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
