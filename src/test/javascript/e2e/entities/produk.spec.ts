import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Produk e2e test', () => {

    let navBarPage: NavBarPage;
    let produkDialogPage: ProdukDialogPage;
    let produkComponentsPage: ProdukComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Produks', () => {
        navBarPage.goToEntity('produk');
        produkComponentsPage = new ProdukComponentsPage();
        expect(produkComponentsPage.getTitle()).toMatch(/ayogatewayApp.produk.home.title/);

    });

    it('should load create Produk dialog', () => {
        produkComponentsPage.clickOnCreateButton();
        produkDialogPage = new ProdukDialogPage();
        expect(produkDialogPage.getModalTitle()).toMatch(/ayogatewayApp.produk.home.createOrEditLabel/);
        produkDialogPage.close();
    });

    it('should create and save Produks', () => {
        produkComponentsPage.clickOnCreateButton();
        produkDialogPage.setIdProdukInput('5');
        expect(produkDialogPage.getIdProdukInput()).toMatch('5');
        produkDialogPage.setKodeProdukInput('kodeProduk');
        expect(produkDialogPage.getKodeProdukInput()).toMatch('kodeProduk');
        produkDialogPage.setIdKartuInput('5');
        expect(produkDialogPage.getIdKartuInput()).toMatch('5');
        produkDialogPage.setDenomInput('5');
        expect(produkDialogPage.getDenomInput()).toMatch('5');
        produkDialogPage.setHppInput('5');
        expect(produkDialogPage.getHppInput()).toMatch('5');
        produkDialogPage.setHargaManInput('5');
        expect(produkDialogPage.getHargaManInput()).toMatch('5');
        produkDialogPage.setStatusInput('5');
        expect(produkDialogPage.getStatusInput()).toMatch('5');
        produkDialogPage.setGangguanInput('5');
        expect(produkDialogPage.getGangguanInput()).toMatch('5');
        produkDialogPage.setIdDistributorInput('5');
        expect(produkDialogPage.getIdDistributorInput()).toMatch('5');
        produkDialogPage.setFisikInput('5');
        expect(produkDialogPage.getFisikInput()).toMatch('5');
        produkDialogPage.setTglUpdateInput(12310020012301);
        expect(produkDialogPage.getTglUpdateInput()).toMatch('2001-12-31T02:30');
        produkDialogPage.setUserUpdateInput('userUpdate');
        expect(produkDialogPage.getUserUpdateInput()).toMatch('userUpdate');
        produkDialogPage.setIdDistributor2Input('5');
        expect(produkDialogPage.getIdDistributor2Input()).toMatch('5');
        produkDialogPage.setKonversiSaldoInput('5');
        expect(produkDialogPage.getKonversiSaldoInput()).toMatch('5');
        produkDialogPage.setIsreportInput('5');
        expect(produkDialogPage.getIsreportInput()).toMatch('5');
        produkDialogPage.setIssplitInput('5');
        expect(produkDialogPage.getIssplitInput()).toMatch('5');
        produkDialogPage.setOtotimeopenInput('ototimeopen');
        expect(produkDialogPage.getOtotimeopenInput()).toMatch('ototimeopen');
        produkDialogPage.setOtotimecloseInput('ototimeclose');
        expect(produkDialogPage.getOtotimecloseInput()).toMatch('ototimeclose');
        produkDialogPage.setIdDistributor3Input('5');
        expect(produkDialogPage.getIdDistributor3Input()).toMatch('5');
        produkDialogPage.setIsstokInput('5');
        expect(produkDialogPage.getIsstokInput()).toMatch('5');
        produkDialogPage.setOtoclosestatusInput('5');
        expect(produkDialogPage.getOtoclosestatusInput()).toMatch('5');
        produkDialogPage.setSaldoMinInput('5');
        expect(produkDialogPage.getSaldoMinInput()).toMatch('5');
        produkDialogPage.setAksesInput('5');
        expect(produkDialogPage.getAksesInput()).toMatch('5');
        produkDialogPage.setHlrInput('5');
        expect(produkDialogPage.getHlrInput()).toMatch('5');
        produkDialogPage.setIsulangInput('5');
        expect(produkDialogPage.getIsulangInput()).toMatch('5');
        produkDialogPage.setIsurutInput('5');
        expect(produkDialogPage.getIsurutInput()).toMatch('5');
        produkDialogPage.setFormatppobInput('5');
        expect(produkDialogPage.getFormatppobInput()).toMatch('5');
        produkDialogPage.setJenisppobInput('5');
        expect(produkDialogPage.getJenisppobInput()).toMatch('5');
        produkDialogPage.setKetprodukInput('ketproduk');
        expect(produkDialogPage.getKetprodukInput()).toMatch('ketproduk');
        produkDialogPage.save();
        expect(produkDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProdukComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-produk div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProdukDialogPage {
    modalTitle = element(by.css('h4#myProdukLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idProdukInput = element(by.css('input#field_idProduk'));
    kodeProdukInput = element(by.css('input#field_kodeProduk'));
    idKartuInput = element(by.css('input#field_idKartu'));
    denomInput = element(by.css('input#field_denom'));
    hppInput = element(by.css('input#field_hpp'));
    hargaManInput = element(by.css('input#field_hargaMan'));
    statusInput = element(by.css('input#field_status'));
    gangguanInput = element(by.css('input#field_gangguan'));
    idDistributorInput = element(by.css('input#field_idDistributor'));
    fisikInput = element(by.css('input#field_fisik'));
    tglUpdateInput = element(by.css('input#field_tglUpdate'));
    userUpdateInput = element(by.css('input#field_userUpdate'));
    idDistributor2Input = element(by.css('input#field_idDistributor2'));
    konversiSaldoInput = element(by.css('input#field_konversiSaldo'));
    isreportInput = element(by.css('input#field_isreport'));
    issplitInput = element(by.css('input#field_issplit'));
    ototimeopenInput = element(by.css('input#field_ototimeopen'));
    ototimecloseInput = element(by.css('input#field_ototimeclose'));
    idDistributor3Input = element(by.css('input#field_idDistributor3'));
    isstokInput = element(by.css('input#field_isstok'));
    otoclosestatusInput = element(by.css('input#field_otoclosestatus'));
    saldoMinInput = element(by.css('input#field_saldoMin'));
    aksesInput = element(by.css('input#field_akses'));
    hlrInput = element(by.css('input#field_hlr'));
    isulangInput = element(by.css('input#field_isulang'));
    isurutInput = element(by.css('input#field_isurut'));
    formatppobInput = element(by.css('input#field_formatppob'));
    jenisppobInput = element(by.css('input#field_jenisppob'));
    ketprodukInput = element(by.css('input#field_ketproduk'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdProdukInput = function (idProduk) {
        this.idProdukInput.sendKeys(idProduk);
    }

    getIdProdukInput = function () {
        return this.idProdukInput.getAttribute('value');
    }

    setKodeProdukInput = function (kodeProduk) {
        this.kodeProdukInput.sendKeys(kodeProduk);
    }

    getKodeProdukInput = function () {
        return this.kodeProdukInput.getAttribute('value');
    }

    setIdKartuInput = function (idKartu) {
        this.idKartuInput.sendKeys(idKartu);
    }

    getIdKartuInput = function () {
        return this.idKartuInput.getAttribute('value');
    }

    setDenomInput = function (denom) {
        this.denomInput.sendKeys(denom);
    }

    getDenomInput = function () {
        return this.denomInput.getAttribute('value');
    }

    setHppInput = function (hpp) {
        this.hppInput.sendKeys(hpp);
    }

    getHppInput = function () {
        return this.hppInput.getAttribute('value');
    }

    setHargaManInput = function (hargaMan) {
        this.hargaManInput.sendKeys(hargaMan);
    }

    getHargaManInput = function () {
        return this.hargaManInput.getAttribute('value');
    }

    setStatusInput = function (status) {
        this.statusInput.sendKeys(status);
    }

    getStatusInput = function () {
        return this.statusInput.getAttribute('value');
    }

    setGangguanInput = function (gangguan) {
        this.gangguanInput.sendKeys(gangguan);
    }

    getGangguanInput = function () {
        return this.gangguanInput.getAttribute('value');
    }

    setIdDistributorInput = function (idDistributor) {
        this.idDistributorInput.sendKeys(idDistributor);
    }

    getIdDistributorInput = function () {
        return this.idDistributorInput.getAttribute('value');
    }

    setFisikInput = function (fisik) {
        this.fisikInput.sendKeys(fisik);
    }

    getFisikInput = function () {
        return this.fisikInput.getAttribute('value');
    }

    setTglUpdateInput = function (tglUpdate) {
        this.tglUpdateInput.sendKeys(tglUpdate);
    }

    getTglUpdateInput = function () {
        return this.tglUpdateInput.getAttribute('value');
    }

    setUserUpdateInput = function (userUpdate) {
        this.userUpdateInput.sendKeys(userUpdate);
    }

    getUserUpdateInput = function () {
        return this.userUpdateInput.getAttribute('value');
    }

    setIdDistributor2Input = function (idDistributor2) {
        this.idDistributor2Input.sendKeys(idDistributor2);
    }

    getIdDistributor2Input = function () {
        return this.idDistributor2Input.getAttribute('value');
    }

    setKonversiSaldoInput = function (konversiSaldo) {
        this.konversiSaldoInput.sendKeys(konversiSaldo);
    }

    getKonversiSaldoInput = function () {
        return this.konversiSaldoInput.getAttribute('value');
    }

    setIsreportInput = function (isreport) {
        this.isreportInput.sendKeys(isreport);
    }

    getIsreportInput = function () {
        return this.isreportInput.getAttribute('value');
    }

    setIssplitInput = function (issplit) {
        this.issplitInput.sendKeys(issplit);
    }

    getIssplitInput = function () {
        return this.issplitInput.getAttribute('value');
    }

    setOtotimeopenInput = function (ototimeopen) {
        this.ototimeopenInput.sendKeys(ototimeopen);
    }

    getOtotimeopenInput = function () {
        return this.ototimeopenInput.getAttribute('value');
    }

    setOtotimecloseInput = function (ototimeclose) {
        this.ototimecloseInput.sendKeys(ototimeclose);
    }

    getOtotimecloseInput = function () {
        return this.ototimecloseInput.getAttribute('value');
    }

    setIdDistributor3Input = function (idDistributor3) {
        this.idDistributor3Input.sendKeys(idDistributor3);
    }

    getIdDistributor3Input = function () {
        return this.idDistributor3Input.getAttribute('value');
    }

    setIsstokInput = function (isstok) {
        this.isstokInput.sendKeys(isstok);
    }

    getIsstokInput = function () {
        return this.isstokInput.getAttribute('value');
    }

    setOtoclosestatusInput = function (otoclosestatus) {
        this.otoclosestatusInput.sendKeys(otoclosestatus);
    }

    getOtoclosestatusInput = function () {
        return this.otoclosestatusInput.getAttribute('value');
    }

    setSaldoMinInput = function (saldoMin) {
        this.saldoMinInput.sendKeys(saldoMin);
    }

    getSaldoMinInput = function () {
        return this.saldoMinInput.getAttribute('value');
    }

    setAksesInput = function (akses) {
        this.aksesInput.sendKeys(akses);
    }

    getAksesInput = function () {
        return this.aksesInput.getAttribute('value');
    }

    setHlrInput = function (hlr) {
        this.hlrInput.sendKeys(hlr);
    }

    getHlrInput = function () {
        return this.hlrInput.getAttribute('value');
    }

    setIsulangInput = function (isulang) {
        this.isulangInput.sendKeys(isulang);
    }

    getIsulangInput = function () {
        return this.isulangInput.getAttribute('value');
    }

    setIsurutInput = function (isurut) {
        this.isurutInput.sendKeys(isurut);
    }

    getIsurutInput = function () {
        return this.isurutInput.getAttribute('value');
    }

    setFormatppobInput = function (formatppob) {
        this.formatppobInput.sendKeys(formatppob);
    }

    getFormatppobInput = function () {
        return this.formatppobInput.getAttribute('value');
    }

    setJenisppobInput = function (jenisppob) {
        this.jenisppobInput.sendKeys(jenisppob);
    }

    getJenisppobInput = function () {
        return this.jenisppobInput.getAttribute('value');
    }

    setKetprodukInput = function (ketproduk) {
        this.ketprodukInput.sendKeys(ketproduk);
    }

    getKetprodukInput = function () {
        return this.ketprodukInput.getAttribute('value');
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
