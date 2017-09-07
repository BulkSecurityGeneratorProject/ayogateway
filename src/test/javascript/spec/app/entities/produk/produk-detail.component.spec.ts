/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AyogatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProdukDetailComponent } from '../../../../../../main/webapp/app/entities/produk/produk-detail.component';
import { ProdukService } from '../../../../../../main/webapp/app/entities/produk/produk.service';
import { Produk } from '../../../../../../main/webapp/app/entities/produk/produk.model';

describe('Component Tests', () => {

    describe('Produk Management Detail Component', () => {
        let comp: ProdukDetailComponent;
        let fixture: ComponentFixture<ProdukDetailComponent>;
        let service: ProdukService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AyogatewayTestModule],
                declarations: [ProdukDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProdukService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProdukDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProdukDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProdukService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Produk(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.produk).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
