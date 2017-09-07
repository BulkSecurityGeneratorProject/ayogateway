import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('LogSaldo e2e test', () => {

    let navBarPage: NavBarPage;
    let logSaldoDialogPage: LogSaldoDialogPage;
    let logSaldoComponentsPage: LogSaldoComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load LogSaldos', () => {
        navBarPage.goToEntity('log-saldo');
        logSaldoComponentsPage = new LogSaldoComponentsPage();
        expect(logSaldoComponentsPage.getTitle()).toMatch(/ayogatewayApp.logSaldo.home.title/);

    });

    it('should load create LogSaldo dialog', () => {
        logSaldoComponentsPage.clickOnCreateButton();
        logSaldoDialogPage = new LogSaldoDialogPage();
        expect(logSaldoDialogPage.getModalTitle()).toMatch(/ayogatewayApp.logSaldo.home.createOrEditLabel/);
        logSaldoDialogPage.close();
    });

    it('should create and save LogSaldos', () => {
        logSaldoComponentsPage.clickOnCreateButton();
        logSaldoDialogPage.setIdMemberInput('idMember');
        expect(logSaldoDialogPage.getIdMemberInput()).toMatch('idMember');
        logSaldoDialogPage.setSaldoInput('5');
        expect(logSaldoDialogPage.getSaldoInput()).toMatch('5');
        logSaldoDialogPage.setActInput('5');
        expect(logSaldoDialogPage.getActInput()).toMatch('5');
        logSaldoDialogPage.setTglInput(12310020012301);
        expect(logSaldoDialogPage.getTglInput()).toMatch('2001-12-31T02:30');
        logSaldoDialogPage.setKetInput('ket');
        expect(logSaldoDialogPage.getKetInput()).toMatch('ket');
        logSaldoDialogPage.setRefInput('5');
        expect(logSaldoDialogPage.getRefInput()).toMatch('5');
        logSaldoDialogPage.setTkodeInput('5');
        expect(logSaldoDialogPage.getTkodeInput()).toMatch('5');
        logSaldoDialogPage.setKodetrxInput('5');
        expect(logSaldoDialogPage.getKodetrxInput()).toMatch('5');
        logSaldoDialogPage.setMsgInput('msg');
        expect(logSaldoDialogPage.getMsgInput()).toMatch('msg');
        logSaldoDialogPage.setUserInputInput('userInput');
        expect(logSaldoDialogPage.getUserInputInput()).toMatch('userInput');
        logSaldoDialogPage.setIsstokInput('5');
        expect(logSaldoDialogPage.getIsstokInput()).toMatch('5');
        logSaldoDialogPage.save();
        expect(logSaldoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LogSaldoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-log-saldo div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LogSaldoDialogPage {
    modalTitle = element(by.css('h4#myLogSaldoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idMemberInput = element(by.css('input#field_idMember'));
    saldoInput = element(by.css('input#field_saldo'));
    actInput = element(by.css('input#field_act'));
    tglInput = element(by.css('input#field_tgl'));
    ketInput = element(by.css('input#field_ket'));
    refInput = element(by.css('input#field_ref'));
    tkodeInput = element(by.css('input#field_tkode'));
    kodetrxInput = element(by.css('input#field_kodetrx'));
    msgInput = element(by.css('input#field_msg'));
    userInputInput = element(by.css('input#field_userInput'));
    isstokInput = element(by.css('input#field_isstok'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdMemberInput = function (idMember) {
        this.idMemberInput.sendKeys(idMember);
    }

    getIdMemberInput = function () {
        return this.idMemberInput.getAttribute('value');
    }

    setSaldoInput = function (saldo) {
        this.saldoInput.sendKeys(saldo);
    }

    getSaldoInput = function () {
        return this.saldoInput.getAttribute('value');
    }

    setActInput = function (act) {
        this.actInput.sendKeys(act);
    }

    getActInput = function () {
        return this.actInput.getAttribute('value');
    }

    setTglInput = function (tgl) {
        this.tglInput.sendKeys(tgl);
    }

    getTglInput = function () {
        return this.tglInput.getAttribute('value');
    }

    setKetInput = function (ket) {
        this.ketInput.sendKeys(ket);
    }

    getKetInput = function () {
        return this.ketInput.getAttribute('value');
    }

    setRefInput = function (ref) {
        this.refInput.sendKeys(ref);
    }

    getRefInput = function () {
        return this.refInput.getAttribute('value');
    }

    setTkodeInput = function (tkode) {
        this.tkodeInput.sendKeys(tkode);
    }

    getTkodeInput = function () {
        return this.tkodeInput.getAttribute('value');
    }

    setKodetrxInput = function (kodetrx) {
        this.kodetrxInput.sendKeys(kodetrx);
    }

    getKodetrxInput = function () {
        return this.kodetrxInput.getAttribute('value');
    }

    setMsgInput = function (msg) {
        this.msgInput.sendKeys(msg);
    }

    getMsgInput = function () {
        return this.msgInput.getAttribute('value');
    }

    setUserInputInput = function (userInput) {
        this.userInputInput.sendKeys(userInput);
    }

    getUserInputInput = function () {
        return this.userInputInput.getAttribute('value');
    }

    setIsstokInput = function (isstok) {
        this.isstokInput.sendKeys(isstok);
    }

    getIsstokInput = function () {
        return this.isstokInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
