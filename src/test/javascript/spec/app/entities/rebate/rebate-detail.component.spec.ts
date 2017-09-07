/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AyogatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RebateDetailComponent } from '../../../../../../main/webapp/app/entities/rebate/rebate-detail.component';
import { RebateService } from '../../../../../../main/webapp/app/entities/rebate/rebate.service';
import { Rebate } from '../../../../../../main/webapp/app/entities/rebate/rebate.model';

describe('Component Tests', () => {

    describe('Rebate Management Detail Component', () => {
        let comp: RebateDetailComponent;
        let fixture: ComponentFixture<RebateDetailComponent>;
        let service: RebateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AyogatewayTestModule],
                declarations: [RebateDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RebateService,
                    JhiEventManager
                ]
            }).overrideTemplate(RebateDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RebateDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RebateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Rebate(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.rebate).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
