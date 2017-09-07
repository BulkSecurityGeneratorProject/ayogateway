/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AyogatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { KartuDetailComponent } from '../../../../../../main/webapp/app/entities/kartu/kartu-detail.component';
import { KartuService } from '../../../../../../main/webapp/app/entities/kartu/kartu.service';
import { Kartu } from '../../../../../../main/webapp/app/entities/kartu/kartu.model';

describe('Component Tests', () => {

    describe('Kartu Management Detail Component', () => {
        let comp: KartuDetailComponent;
        let fixture: ComponentFixture<KartuDetailComponent>;
        let service: KartuService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AyogatewayTestModule],
                declarations: [KartuDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    KartuService,
                    JhiEventManager
                ]
            }).overrideTemplate(KartuDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KartuDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KartuService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Kartu(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.kartu).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
