/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AyogatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { KoneksiDetailComponent } from '../../../../../../main/webapp/app/entities/koneksi/koneksi-detail.component';
import { KoneksiService } from '../../../../../../main/webapp/app/entities/koneksi/koneksi.service';
import { Koneksi } from '../../../../../../main/webapp/app/entities/koneksi/koneksi.model';

describe('Component Tests', () => {

    describe('Koneksi Management Detail Component', () => {
        let comp: KoneksiDetailComponent;
        let fixture: ComponentFixture<KoneksiDetailComponent>;
        let service: KoneksiService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AyogatewayTestModule],
                declarations: [KoneksiDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    KoneksiService,
                    JhiEventManager
                ]
            }).overrideTemplate(KoneksiDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KoneksiDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KoneksiService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Koneksi(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.koneksi).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
