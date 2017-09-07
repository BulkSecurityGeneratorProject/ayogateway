import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Harga e2e test', () => {

    let navBarPage: NavBarPage;
    let hargaDialogPage: HargaDialogPage;
    let hargaComponentsPage: HargaComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Hargas', () => {
        navBarPage.goToEntity('harga');
        hargaComponentsPage = new HargaComponentsPage();
        expect(hargaComponentsPage.getTitle()).toMatch(/ayogatewayApp.harga.home.title/);

    });

    it('should load create Harga dialog', () => {
        hargaComponentsPage.clickOnCreateButton();
        hargaDialogPage = new HargaDialogPage();
        expect(hargaDialogPage.getModalTitle()).toMatch(/ayogatewayApp.harga.home.createOrEditLabel/);
        hargaDialogPage.close();
    });

    it('should create and save Hargas', () => {
        hargaComponentsPage.clickOnCreateButton();
        hargaDialogPage.setIdHargaInput('5');
        expect(hargaDialogPage.getIdHargaInput()).toMatch('5');
        hargaDialogPage.setIdProdukInput('5');
        expect(hargaDialogPage.getIdProdukInput()).toMatch('5');
        hargaDialogPage.setIdMemberInput('idMember');
        expect(hargaDialogPage.getIdMemberInput()).toMatch('idMember');
        hargaDialogPage.setHargaJualInput('5');
        expect(hargaDialogPage.getHargaJualInput()).toMatch('5');
        hargaDialogPage.setTglInputInput(12310020012301);
        expect(hargaDialogPage.getTglInputInput()).toMatch('2001-12-31T02:30');
        hargaDialogPage.setUserInputInput('userInput');
        expect(hargaDialogPage.getUserInputInput()).toMatch('userInput');
        hargaDialogPage.setHargaBeforeInput('5');
        expect(hargaDialogPage.getHargaBeforeInput()).toMatch('5');
        hargaDialogPage.save();
        expect(hargaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class HargaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-harga div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class HargaDialogPage {
    modalTitle = element(by.css('h4#myHargaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idHargaInput = element(by.css('input#field_idHarga'));
    idProdukInput = element(by.css('input#field_idProduk'));
    idMemberInput = element(by.css('input#field_idMember'));
    hargaJualInput = element(by.css('input#field_hargaJual'));
    tglInputInput = element(by.css('input#field_tglInput'));
    userInputInput = element(by.css('input#field_userInput'));
    hargaBeforeInput = element(by.css('input#field_hargaBefore'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdHargaInput = function (idHarga) {
        this.idHargaInput.sendKeys(idHarga);
    }

    getIdHargaInput = function () {
        return this.idHargaInput.getAttribute('value');
    }

    setIdProdukInput = function (idProduk) {
        this.idProdukInput.sendKeys(idProduk);
    }

    getIdProdukInput = function () {
        return this.idProdukInput.getAttribute('value');
    }

    setIdMemberInput = function (idMember) {
        this.idMemberInput.sendKeys(idMember);
    }

    getIdMemberInput = function () {
        return this.idMemberInput.getAttribute('value');
    }

    setHargaJualInput = function (hargaJual) {
        this.hargaJualInput.sendKeys(hargaJual);
    }

    getHargaJualInput = function () {
        return this.hargaJualInput.getAttribute('value');
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

    setHargaBeforeInput = function (hargaBefore) {
        this.hargaBeforeInput.sendKeys(hargaBefore);
    }

    getHargaBeforeInput = function () {
        return this.hargaBeforeInput.getAttribute('value');
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
