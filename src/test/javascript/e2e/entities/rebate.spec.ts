import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Rebate e2e test', () => {

    let navBarPage: NavBarPage;
    let rebateDialogPage: RebateDialogPage;
    let rebateComponentsPage: RebateComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Rebates', () => {
        navBarPage.goToEntity('rebate');
        rebateComponentsPage = new RebateComponentsPage();
        expect(rebateComponentsPage.getTitle()).toMatch(/ayogatewayApp.rebate.home.title/);

    });

    it('should load create Rebate dialog', () => {
        rebateComponentsPage.clickOnCreateButton();
        rebateDialogPage = new RebateDialogPage();
        expect(rebateDialogPage.getModalTitle()).toMatch(/ayogatewayApp.rebate.home.createOrEditLabel/);
        rebateDialogPage.close();
    });

    it('should create and save Rebates', () => {
        rebateComponentsPage.clickOnCreateButton();
        rebateDialogPage.setIdTransaksiInput('5');
        expect(rebateDialogPage.getIdTransaksiInput()).toMatch('5');
        rebateDialogPage.setJmlInput('5');
        expect(rebateDialogPage.getJmlInput()).toMatch('5');
        rebateDialogPage.setHargaProdukInput('5');
        expect(rebateDialogPage.getHargaProdukInput()).toMatch('5');
        rebateDialogPage.setIdMemberInput('idMember');
        expect(rebateDialogPage.getIdMemberInput()).toMatch('idMember');
        rebateDialogPage.setLevelInput('5');
        expect(rebateDialogPage.getLevelInput()).toMatch('5');
        rebateDialogPage.setBulanInput('5');
        expect(rebateDialogPage.getBulanInput()).toMatch('5');
        rebateDialogPage.setTahunInput('5');
        expect(rebateDialogPage.getTahunInput()).toMatch('5');
        rebateDialogPage.setStatusInput('5');
        expect(rebateDialogPage.getStatusInput()).toMatch('5');
        rebateDialogPage.save();
        expect(rebateDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RebateComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-rebate div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RebateDialogPage {
    modalTitle = element(by.css('h4#myRebateLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idTransaksiInput = element(by.css('input#field_idTransaksi'));
    jmlInput = element(by.css('input#field_jml'));
    hargaProdukInput = element(by.css('input#field_hargaProduk'));
    idMemberInput = element(by.css('input#field_idMember'));
    levelInput = element(by.css('input#field_level'));
    bulanInput = element(by.css('input#field_bulan'));
    tahunInput = element(by.css('input#field_tahun'));
    statusInput = element(by.css('input#field_status'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdTransaksiInput = function (idTransaksi) {
        this.idTransaksiInput.sendKeys(idTransaksi);
    }

    getIdTransaksiInput = function () {
        return this.idTransaksiInput.getAttribute('value');
    }

    setJmlInput = function (jml) {
        this.jmlInput.sendKeys(jml);
    }

    getJmlInput = function () {
        return this.jmlInput.getAttribute('value');
    }

    setHargaProdukInput = function (hargaProduk) {
        this.hargaProdukInput.sendKeys(hargaProduk);
    }

    getHargaProdukInput = function () {
        return this.hargaProdukInput.getAttribute('value');
    }

    setIdMemberInput = function (idMember) {
        this.idMemberInput.sendKeys(idMember);
    }

    getIdMemberInput = function () {
        return this.idMemberInput.getAttribute('value');
    }

    setLevelInput = function (level) {
        this.levelInput.sendKeys(level);
    }

    getLevelInput = function () {
        return this.levelInput.getAttribute('value');
    }

    setBulanInput = function (bulan) {
        this.bulanInput.sendKeys(bulan);
    }

    getBulanInput = function () {
        return this.bulanInput.getAttribute('value');
    }

    setTahunInput = function (tahun) {
        this.tahunInput.sendKeys(tahun);
    }

    getTahunInput = function () {
        return this.tahunInput.getAttribute('value');
    }

    setStatusInput = function (status) {
        this.statusInput.sendKeys(status);
    }

    getStatusInput = function () {
        return this.statusInput.getAttribute('value');
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
