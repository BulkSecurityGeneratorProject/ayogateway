import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('SmsHistory e2e test', () => {

    let navBarPage: NavBarPage;
    let smsHistoryDialogPage: SmsHistoryDialogPage;
    let smsHistoryComponentsPage: SmsHistoryComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SmsHistories', () => {
        navBarPage.goToEntity('sms-history');
        smsHistoryComponentsPage = new SmsHistoryComponentsPage();
        expect(smsHistoryComponentsPage.getTitle()).toMatch(/ayogatewayApp.smsHistory.home.title/);

    });

    it('should load create SmsHistory dialog', () => {
        smsHistoryComponentsPage.clickOnCreateButton();
        smsHistoryDialogPage = new SmsHistoryDialogPage();
        expect(smsHistoryDialogPage.getModalTitle()).toMatch(/ayogatewayApp.smsHistory.home.createOrEditLabel/);
        smsHistoryDialogPage.close();
    });

    it('should create and save SmsHistories', () => {
        smsHistoryComponentsPage.clickOnCreateButton();
        smsHistoryDialogPage.setTglInputInput(12310020012301);
        expect(smsHistoryDialogPage.getTglInputInput()).toMatch('2001-12-31T02:30');
        smsHistoryDialogPage.setNoHpInput('noHp');
        expect(smsHistoryDialogPage.getNoHpInput()).toMatch('noHp');
        smsHistoryDialogPage.setNamaInput('nama');
        expect(smsHistoryDialogPage.getNamaInput()).toMatch('nama');
        smsHistoryDialogPage.setPesanInput('pesan');
        expect(smsHistoryDialogPage.getPesanInput()).toMatch('pesan');
        smsHistoryDialogPage.setTipeInput('5');
        expect(smsHistoryDialogPage.getTipeInput()).toMatch('5');
        smsHistoryDialogPage.setTglSmsInput(12310020012301);
        expect(smsHistoryDialogPage.getTglSmsInput()).toMatch('2001-12-31T02:30');
        smsHistoryDialogPage.setComInput('com');
        expect(smsHistoryDialogPage.getComInput()).toMatch('com');
        smsHistoryDialogPage.setReportInput('5');
        expect(smsHistoryDialogPage.getReportInput()).toMatch('5');
        smsHistoryDialogPage.setTrxInput('5');
        expect(smsHistoryDialogPage.getTrxInput()).toMatch('5');
        smsHistoryDialogPage.setPostingInput('5');
        expect(smsHistoryDialogPage.getPostingInput()).toMatch('5');
        smsHistoryDialogPage.setRefInput('ref');
        expect(smsHistoryDialogPage.getRefInput()).toMatch('ref');
        smsHistoryDialogPage.setMsisdnInput('msisdn');
        expect(smsHistoryDialogPage.getMsisdnInput()).toMatch('msisdn');
        smsHistoryDialogPage.setEnginenameInput('enginename');
        expect(smsHistoryDialogPage.getEnginenameInput()).toMatch('enginename');
        smsHistoryDialogPage.setIpInput('ip');
        expect(smsHistoryDialogPage.getIpInput()).toMatch('ip');
        smsHistoryDialogPage.setTypemsgInput('5');
        expect(smsHistoryDialogPage.getTypemsgInput()).toMatch('5');
        smsHistoryDialogPage.setIdMemberInput('idMember');
        expect(smsHistoryDialogPage.getIdMemberInput()).toMatch('idMember');
        smsHistoryDialogPage.save();
        expect(smsHistoryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SmsHistoryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-sms-history div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SmsHistoryDialogPage {
    modalTitle = element(by.css('h4#mySmsHistoryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    tglInputInput = element(by.css('input#field_tglInput'));
    noHpInput = element(by.css('input#field_noHp'));
    namaInput = element(by.css('input#field_nama'));
    pesanInput = element(by.css('input#field_pesan'));
    tipeInput = element(by.css('input#field_tipe'));
    tglSmsInput = element(by.css('input#field_tglSms'));
    comInput = element(by.css('input#field_com'));
    reportInput = element(by.css('input#field_report'));
    trxInput = element(by.css('input#field_trx'));
    postingInput = element(by.css('input#field_posting'));
    refInput = element(by.css('input#field_ref'));
    msisdnInput = element(by.css('input#field_msisdn'));
    enginenameInput = element(by.css('input#field_enginename'));
    ipInput = element(by.css('input#field_ip'));
    typemsgInput = element(by.css('input#field_typemsg'));
    idMemberInput = element(by.css('input#field_idMember'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTglInputInput = function (tglInput) {
        this.tglInputInput.sendKeys(tglInput);
    }

    getTglInputInput = function () {
        return this.tglInputInput.getAttribute('value');
    }

    setNoHpInput = function (noHp) {
        this.noHpInput.sendKeys(noHp);
    }

    getNoHpInput = function () {
        return this.noHpInput.getAttribute('value');
    }

    setNamaInput = function (nama) {
        this.namaInput.sendKeys(nama);
    }

    getNamaInput = function () {
        return this.namaInput.getAttribute('value');
    }

    setPesanInput = function (pesan) {
        this.pesanInput.sendKeys(pesan);
    }

    getPesanInput = function () {
        return this.pesanInput.getAttribute('value');
    }

    setTipeInput = function (tipe) {
        this.tipeInput.sendKeys(tipe);
    }

    getTipeInput = function () {
        return this.tipeInput.getAttribute('value');
    }

    setTglSmsInput = function (tglSms) {
        this.tglSmsInput.sendKeys(tglSms);
    }

    getTglSmsInput = function () {
        return this.tglSmsInput.getAttribute('value');
    }

    setComInput = function (com) {
        this.comInput.sendKeys(com);
    }

    getComInput = function () {
        return this.comInput.getAttribute('value');
    }

    setReportInput = function (report) {
        this.reportInput.sendKeys(report);
    }

    getReportInput = function () {
        return this.reportInput.getAttribute('value');
    }

    setTrxInput = function (trx) {
        this.trxInput.sendKeys(trx);
    }

    getTrxInput = function () {
        return this.trxInput.getAttribute('value');
    }

    setPostingInput = function (posting) {
        this.postingInput.sendKeys(posting);
    }

    getPostingInput = function () {
        return this.postingInput.getAttribute('value');
    }

    setRefInput = function (ref) {
        this.refInput.sendKeys(ref);
    }

    getRefInput = function () {
        return this.refInput.getAttribute('value');
    }

    setMsisdnInput = function (msisdn) {
        this.msisdnInput.sendKeys(msisdn);
    }

    getMsisdnInput = function () {
        return this.msisdnInput.getAttribute('value');
    }

    setEnginenameInput = function (enginename) {
        this.enginenameInput.sendKeys(enginename);
    }

    getEnginenameInput = function () {
        return this.enginenameInput.getAttribute('value');
    }

    setIpInput = function (ip) {
        this.ipInput.sendKeys(ip);
    }

    getIpInput = function () {
        return this.ipInput.getAttribute('value');
    }

    setTypemsgInput = function (typemsg) {
        this.typemsgInput.sendKeys(typemsg);
    }

    getTypemsgInput = function () {
        return this.typemsgInput.getAttribute('value');
    }

    setIdMemberInput = function (idMember) {
        this.idMemberInput.sendKeys(idMember);
    }

    getIdMemberInput = function () {
        return this.idMemberInput.getAttribute('value');
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
