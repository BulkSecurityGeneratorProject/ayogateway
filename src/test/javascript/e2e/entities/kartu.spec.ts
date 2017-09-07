import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Kartu e2e test', () => {

    let navBarPage: NavBarPage;
    let kartuDialogPage: KartuDialogPage;
    let kartuComponentsPage: KartuComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Kartus', () => {
        navBarPage.goToEntity('kartu');
        kartuComponentsPage = new KartuComponentsPage();
        expect(kartuComponentsPage.getTitle()).toMatch(/ayogatewayApp.kartu.home.title/);

    });

    it('should load create Kartu dialog', () => {
        kartuComponentsPage.clickOnCreateButton();
        kartuDialogPage = new KartuDialogPage();
        expect(kartuDialogPage.getModalTitle()).toMatch(/ayogatewayApp.kartu.home.createOrEditLabel/);
        kartuDialogPage.close();
    });

    it('should create and save Kartus', () => {
        kartuComponentsPage.clickOnCreateButton();
        kartuDialogPage.setIdKartuInput('5');
        expect(kartuDialogPage.getIdKartuInput()).toMatch('5');
        kartuDialogPage.setNamaInput('nama');
        expect(kartuDialogPage.getNamaInput()).toMatch('nama');
        kartuDialogPage.setIdOperatorInput('5');
        expect(kartuDialogPage.getIdOperatorInput()).toMatch('5');
        kartuDialogPage.setCekHlrInput('5');
        expect(kartuDialogPage.getCekHlrInput()).toMatch('5');
        kartuDialogPage.setKetkartuInput('ketkartu');
        expect(kartuDialogPage.getKetkartuInput()).toMatch('ketkartu');
        kartuDialogPage.save();
        expect(kartuDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class KartuComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-kartu div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class KartuDialogPage {
    modalTitle = element(by.css('h4#myKartuLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idKartuInput = element(by.css('input#field_idKartu'));
    namaInput = element(by.css('input#field_nama'));
    idOperatorInput = element(by.css('input#field_idOperator'));
    cekHlrInput = element(by.css('input#field_cekHlr'));
    ketkartuInput = element(by.css('input#field_ketkartu'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdKartuInput = function (idKartu) {
        this.idKartuInput.sendKeys(idKartu);
    }

    getIdKartuInput = function () {
        return this.idKartuInput.getAttribute('value');
    }

    setNamaInput = function (nama) {
        this.namaInput.sendKeys(nama);
    }

    getNamaInput = function () {
        return this.namaInput.getAttribute('value');
    }

    setIdOperatorInput = function (idOperator) {
        this.idOperatorInput.sendKeys(idOperator);
    }

    getIdOperatorInput = function () {
        return this.idOperatorInput.getAttribute('value');
    }

    setCekHlrInput = function (cekHlr) {
        this.cekHlrInput.sendKeys(cekHlr);
    }

    getCekHlrInput = function () {
        return this.cekHlrInput.getAttribute('value');
    }

    setKetkartuInput = function (ketkartu) {
        this.ketkartuInput.sendKeys(ketkartu);
    }

    getKetkartuInput = function () {
        return this.ketkartuInput.getAttribute('value');
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
