/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AyogatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LogSaldoDetailComponent } from '../../../../../../main/webapp/app/entities/log-saldo/log-saldo-detail.component';
import { LogSaldoService } from '../../../../../../main/webapp/app/entities/log-saldo/log-saldo.service';
import { LogSaldo } from '../../../../../../main/webapp/app/entities/log-saldo/log-saldo.model';

describe('Component Tests', () => {

    describe('LogSaldo Management Detail Component', () => {
        let comp: LogSaldoDetailComponent;
        let fixture: ComponentFixture<LogSaldoDetailComponent>;
        let service: LogSaldoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AyogatewayTestModule],
                declarations: [LogSaldoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LogSaldoService,
                    JhiEventManager
                ]
            }).overrideTemplate(LogSaldoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LogSaldoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LogSaldoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new LogSaldo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.logSaldo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
