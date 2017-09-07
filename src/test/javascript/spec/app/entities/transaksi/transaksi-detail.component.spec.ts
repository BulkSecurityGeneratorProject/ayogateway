/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AyogatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TransaksiDetailComponent } from '../../../../../../main/webapp/app/entities/transaksi/transaksi-detail.component';
import { TransaksiService } from '../../../../../../main/webapp/app/entities/transaksi/transaksi.service';
import { Transaksi } from '../../../../../../main/webapp/app/entities/transaksi/transaksi.model';

describe('Component Tests', () => {

    describe('Transaksi Management Detail Component', () => {
        let comp: TransaksiDetailComponent;
        let fixture: ComponentFixture<TransaksiDetailComponent>;
        let service: TransaksiService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AyogatewayTestModule],
                declarations: [TransaksiDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TransaksiService,
                    JhiEventManager
                ]
            }).overrideTemplate(TransaksiDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransaksiDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransaksiService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Transaksi(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.transaksi).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
