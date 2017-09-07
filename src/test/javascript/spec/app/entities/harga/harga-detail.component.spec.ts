/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AyogatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { HargaDetailComponent } from '../../../../../../main/webapp/app/entities/harga/harga-detail.component';
import { HargaService } from '../../../../../../main/webapp/app/entities/harga/harga.service';
import { Harga } from '../../../../../../main/webapp/app/entities/harga/harga.model';

describe('Component Tests', () => {

    describe('Harga Management Detail Component', () => {
        let comp: HargaDetailComponent;
        let fixture: ComponentFixture<HargaDetailComponent>;
        let service: HargaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AyogatewayTestModule],
                declarations: [HargaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    HargaService,
                    JhiEventManager
                ]
            }).overrideTemplate(HargaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HargaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HargaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Harga(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.harga).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
