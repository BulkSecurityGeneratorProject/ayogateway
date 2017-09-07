/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AyogatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DenomDetailComponent } from '../../../../../../main/webapp/app/entities/denom/denom-detail.component';
import { DenomService } from '../../../../../../main/webapp/app/entities/denom/denom.service';
import { Denom } from '../../../../../../main/webapp/app/entities/denom/denom.model';

describe('Component Tests', () => {

    describe('Denom Management Detail Component', () => {
        let comp: DenomDetailComponent;
        let fixture: ComponentFixture<DenomDetailComponent>;
        let service: DenomService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AyogatewayTestModule],
                declarations: [DenomDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DenomService,
                    JhiEventManager
                ]
            }).overrideTemplate(DenomDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DenomDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DenomService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Denom(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.denom).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
