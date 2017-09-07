import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Transaksi e2e test', () => {

    let navBarPage: NavBarPage;
    let transaksiDialogPage: TransaksiDialogPage;
    let transaksiComponentsPage: TransaksiComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Transaksis', () => {
        navBarPage.goToEntity('transaksi');
        transaksiComponentsPage = new TransaksiComponentsPage();
        expect(transaksiComponentsPage.getTitle()).toMatch(/ayogatewayApp.transaksi.home.title/);

    });

    it('should load create Transaksi dialog', () => {
        transaksiComponentsPage.clickOnCreateButton();
        transaksiDialogPage = new TransaksiDialogPage();
        expect(transaksiDialogPage.getModalTitle()).toMatch(/ayogatewayApp.transaksi.home.createOrEditLabel/);
        transaksiDialogPage.close();
    });

    it('should create and save Transaksis', () => {
        transaksiComponentsPage.clickOnCreateButton();
        transaksiDialogPage.setTglTransaksiInput(12310020012301);
        expect(transaksiDialogPage.getTglTransaksiInput()).toMatch('2001-12-31T02:30');
        transaksiDialogPage.setIdMemberInput('idMember');
        expect(transaksiDialogPage.getIdMemberInput()).toMatch('idMember');
        transaksiDialogPage.setNamaInput('nama');
        expect(transaksiDialogPage.getNamaInput()).toMatch('nama');
        transaksiDialogPage.setJmlInput('5');
        expect(transaksiDialogPage.getJmlInput()).toMatch('5');
        transaksiDialogPage.setKodeTrxInput('5');
        expect(transaksiDialogPage.getKodeTrxInput()).toMatch('5');
        transaksiDialogPage.setStatusInput('5');
        expect(transaksiDialogPage.getStatusInput()).toMatch('5');
        transaksiDialogPage.setSaldoAwalInput('5');
        expect(transaksiDialogPage.getSaldoAwalInput()).toMatch('5');
        transaksiDialogPage.setSaldoAkhirInput('5');
        expect(transaksiDialogPage.getSaldoAkhirInput()).toMatch('5');
        transaksiDialogPage.setKetInput('ket');
        expect(transaksiDialogPage.getKetInput()).toMatch('ket');
        transaksiDialogPage.setTglInputInput(12310020012301);
        expect(transaksiDialogPage.getTglInputInput()).toMatch('2001-12-31T02:30');
        transaksiDialogPage.setUserInputInput('userInput');
        expect(transaksiDialogPage.getUserInputInput()).toMatch('userInput');
        transaksiDialogPage.setIsstokInput('5');
        expect(transaksiDialogPage.getIsstokInput()).toMatch('5');
        transaksiDialogPage.save();
        expect(transaksiDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TransaksiComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-transaksi div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TransaksiDialogPage {
    modalTitle = element(by.css('h4#myTransaksiLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    tglTransaksiInput = element(by.css('input#field_tglTransaksi'));
    idMemberInput = element(by.css('input#field_idMember'));
    namaInput = element(by.css('input#field_nama'));
    jmlInput = element(by.css('input#field_jml'));
    kodeTrxInput = element(by.css('input#field_kodeTrx'));
    statusInput = element(by.css('input#field_status'));
    saldoAwalInput = element(by.css('input#field_saldoAwal'));
    saldoAkhirInput = element(by.css('input#field_saldoAkhir'));
    ketInput = element(by.css('input#field_ket'));
    tglInputInput = element(by.css('input#field_tglInput'));
    userInputInput = element(by.css('input#field_userInput'));
    isstokInput = element(by.css('input#field_isstok'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTglTransaksiInput = function (tglTransaksi) {
        this.tglTransaksiInput.sendKeys(tglTransaksi);
    }

    getTglTransaksiInput = function () {
        return this.tglTransaksiInput.getAttribute('value');
    }

    setIdMemberInput = function (idMember) {
        this.idMemberInput.sendKeys(idMember);
    }

    getIdMemberInput = function () {
        return this.idMemberInput.getAttribute('value');
    }

    setNamaInput = function (nama) {
        this.namaInput.sendKeys(nama);
    }

    getNamaInput = function () {
        return this.namaInput.getAttribute('value');
    }

    setJmlInput = function (jml) {
        this.jmlInput.sendKeys(jml);
    }

    getJmlInput = function () {
        return this.jmlInput.getAttribute('value');
    }

    setKodeTrxInput = function (kodeTrx) {
        this.kodeTrxInput.sendKeys(kodeTrx);
    }

    getKodeTrxInput = function () {
        return this.kodeTrxInput.getAttribute('value');
    }

    setStatusInput = function (status) {
        this.statusInput.sendKeys(status);
    }

    getStatusInput = function () {
        return this.statusInput.getAttribute('value');
    }

    setSaldoAwalInput = function (saldoAwal) {
        this.saldoAwalInput.sendKeys(saldoAwal);
    }

    getSaldoAwalInput = function () {
        return this.saldoAwalInput.getAttribute('value');
    }

    setSaldoAkhirInput = function (saldoAkhir) {
        this.saldoAkhirInput.sendKeys(saldoAkhir);
    }

    getSaldoAkhirInput = function () {
        return this.saldoAkhirInput.getAttribute('value');
    }

    setKetInput = function (ket) {
        this.ketInput.sendKeys(ket);
    }

    getKetInput = function () {
        return this.ketInput.getAttribute('value');
    }

    setTglInputInput = function (tglInput) {
        this.tglInputInput.sendKeys(tglInput);
    }

    getTglInputInput = function () {
        return this.tglInputInput.getAttribute('value');
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
