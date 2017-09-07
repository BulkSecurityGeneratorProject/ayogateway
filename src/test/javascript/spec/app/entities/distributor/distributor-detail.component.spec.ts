/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AyogatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DistributorDetailComponent } from '../../../../../../main/webapp/app/entities/distributor/distributor-detail.component';
import { DistributorService } from '../../../../../../main/webapp/app/entities/distributor/distributor.service';
import { Distributor } from '../../../../../../main/webapp/app/entities/distributor/distributor.model';

describe('Component Tests', () => {

    describe('Distributor Management Detail Component', () => {
        let comp: DistributorDetailComponent;
        let fixture: ComponentFixture<DistributorDetailComponent>;
        let service: DistributorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AyogatewayTestModule],
                declarations: [DistributorDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DistributorService,
                    JhiEventManager
                ]
            }).overrideTemplate(DistributorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DistributorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DistributorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Distributor(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.distributor).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
