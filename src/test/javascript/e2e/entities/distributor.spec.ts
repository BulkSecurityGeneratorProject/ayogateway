import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Distributor e2e test', () => {

    let navBarPage: NavBarPage;
    let distributorDialogPage: DistributorDialogPage;
    let distributorComponentsPage: DistributorComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Distributors', () => {
        navBarPage.goToEntity('distributor');
        distributorComponentsPage = new DistributorComponentsPage();
        expect(distributorComponentsPage.getTitle()).toMatch(/ayogatewayApp.distributor.home.title/);

    });

    it('should load create Distributor dialog', () => {
        distributorComponentsPage.clickOnCreateButton();
        distributorDialogPage = new DistributorDialogPage();
        expect(distributorDialogPage.getModalTitle()).toMatch(/ayogatewayApp.distributor.home.createOrEditLabel/);
        distributorDialogPage.close();
    });

    it('should create and save Distributors', () => {
        distributorComponentsPage.clickOnCreateButton();
        distributorDialogPage.setIdDistributorInput('5');
        expect(distributorDialogPage.getIdDistributorInput()).toMatch('5');
        distributorDialogPage.setNamaInput('nama');
        expect(distributorDialogPage.getNamaInput()).toMatch('nama');
        distributorDialogPage.setStatusInput('5');
        expect(distributorDialogPage.getStatusInput()).toMatch('5');
        distributorDialogPage.setKodeIdInput('kodeId');
        expect(distributorDialogPage.getKodeIdInput()).toMatch('kodeId');
        distributorDialogPage.setPinInput('pin');
        expect(distributorDialogPage.getPinInput()).toMatch('pin');
        distributorDialogPage.setComInput('com');
        expect(distributorDialogPage.getComInput()).toMatch('com');
        distributorDialogPage.setNoKontakInput('noKontak');
        expect(distributorDialogPage.getNoKontakInput()).toMatch('noKontak');
        distributorDialogPage.setMetodeInput('metode');
        expect(distributorDialogPage.getMetodeInput()).toMatch('metode');
        distributorDialogPage.setKodeParsingInput('kodeParsing');
        expect(distributorDialogPage.getKodeParsingInput()).toMatch('kodeParsing');
        distributorDialogPage.setKodeParsing2Input('kodeParsing2');
        expect(distributorDialogPage.getKodeParsing2Input()).toMatch('kodeParsing2');
        distributorDialogPage.setReplynoInput('replyno');
        expect(distributorDialogPage.getReplynoInput()).toMatch('replyno');
        distributorDialogPage.setTglInputInput(12310020012301);
        expect(distributorDialogPage.getTglInputInput()).toMatch('2001-12-31T02:30');
        distributorDialogPage.setUserInputInput('userInput');
        expect(distributorDialogPage.getUserInputInput()).toMatch('userInput');
        distributorDialogPage.setTglUpdateInput(12310020012301);
        expect(distributorDialogPage.getTglUpdateInput()).toMatch('2001-12-31T02:30');
        distributorDialogPage.setUserUpdateInput('userUpdate');
        expect(distributorDialogPage.getUserUpdateInput()).toMatch('userUpdate');
        distributorDialogPage.setIpInput('ip');
        expect(distributorDialogPage.getIpInput()).toMatch('ip');
        distributorDialogPage.setIsvreInput('5');
        expect(distributorDialogPage.getIsvreInput()).toMatch('5');
        distributorDialogPage.setIsgtwInput('5');
        expect(distributorDialogPage.getIsgtwInput()).toMatch('5');
        distributorDialogPage.setUgtwInput('ugtw');
        expect(distributorDialogPage.getUgtwInput()).toMatch('ugtw');
        distributorDialogPage.setIsfilterInput('5');
        expect(distributorDialogPage.getIsfilterInput()).toMatch('5');
        distributorDialogPage.setParseSaldoInput('parseSaldo');
        expect(distributorDialogPage.getParseSaldoInput()).toMatch('parseSaldo');
        distributorDialogPage.setParseHargaInput('parseHarga');
        expect(distributorDialogPage.getParseHargaInput()).toMatch('parseHarga');
        distributorDialogPage.setTiketWrapInput('tiketWrap');
        expect(distributorDialogPage.getTiketWrapInput()).toMatch('tiketWrap');
        distributorDialogPage.setIstiketsendInput('5');
        expect(distributorDialogPage.getIstiketsendInput()).toMatch('5');
        distributorDialogPage.setPesanTiketInput('pesanTiket');
        expect(distributorDialogPage.getPesanTiketInput()).toMatch('pesanTiket');
        distributorDialogPage.setSaldoSupwarnInput('5');
        expect(distributorDialogPage.getSaldoSupwarnInput()).toMatch('5');
        distributorDialogPage.setIssortbyInput('5');
        expect(distributorDialogPage.getIssortbyInput()).toMatch('5');
        distributorDialogPage.setParseUnitInput('parseUnit');
        expect(distributorDialogPage.getParseUnitInput()).toMatch('parseUnit');
        distributorDialogPage.setIsulangimInput('5');
        expect(distributorDialogPage.getIsulangimInput()).toMatch('5');
        distributorDialogPage.setIshlrInput('5');
        expect(distributorDialogPage.getIshlrInput()).toMatch('5');
        distributorDialogPage.setKodeParsing3Input('kodeParsing3');
        expect(distributorDialogPage.getKodeParsing3Input()).toMatch('kodeParsing3');
        distributorDialogPage.setIdHistoryInput('5');
        expect(distributorDialogPage.getIdHistoryInput()).toMatch('5');
        distributorDialogPage.setKodeParsing4Input('kodeParsing4');
        expect(distributorDialogPage.getKodeParsing4Input()).toMatch('kodeParsing4');
        distributorDialogPage.setSelisihSupwarnInput('5');
        expect(distributorDialogPage.getSelisihSupwarnInput()).toMatch('5');
        distributorDialogPage.setTimeonInput('timeon');
        expect(distributorDialogPage.getTimeonInput()).toMatch('timeon');
        distributorDialogPage.setTimeoffInput('timeoff');
        expect(distributorDialogPage.getTimeoffInput()).toMatch('timeoff');
        distributorDialogPage.save();
        expect(distributorDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DistributorComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-distributor div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DistributorDialogPage {
    modalTitle = element(by.css('h4#myDistributorLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idDistributorInput = element(by.css('input#field_idDistributor'));
    namaInput = element(by.css('input#field_nama'));
    statusInput = element(by.css('input#field_status'));
    kodeIdInput = element(by.css('input#field_kodeId'));
    pinInput = element(by.css('input#field_pin'));
    comInput = element(by.css('input#field_com'));
    noKontakInput = element(by.css('input#field_noKontak'));
    metodeInput = element(by.css('input#field_metode'));
    kodeParsingInput = element(by.css('input#field_kodeParsing'));
    kodeParsing2Input = element(by.css('input#field_kodeParsing2'));
    replynoInput = element(by.css('input#field_replyno'));
    tglInputInput = element(by.css('input#field_tglInput'));
    userInputInput = element(by.css('input#field_userInput'));
    tglUpdateInput = element(by.css('input#field_tglUpdate'));
    userUpdateInput = element(by.css('input#field_userUpdate'));
    ipInput = element(by.css('input#field_ip'));
    isvreInput = element(by.css('input#field_isvre'));
    isgtwInput = element(by.css('input#field_isgtw'));
    ugtwInput = element(by.css('input#field_ugtw'));
    isfilterInput = element(by.css('input#field_isfilter'));
    parseSaldoInput = element(by.css('input#field_parseSaldo'));
    parseHargaInput = element(by.css('input#field_parseHarga'));
    tiketWrapInput = element(by.css('input#field_tiketWrap'));
    istiketsendInput = element(by.css('input#field_istiketsend'));
    pesanTiketInput = element(by.css('input#field_pesanTiket'));
    saldoSupwarnInput = element(by.css('input#field_saldoSupwarn'));
    issortbyInput = element(by.css('input#field_issortby'));
    parseUnitInput = element(by.css('input#field_parseUnit'));
    isulangimInput = element(by.css('input#field_isulangim'));
    ishlrInput = element(by.css('input#field_ishlr'));
    kodeParsing3Input = element(by.css('input#field_kodeParsing3'));
    idHistoryInput = element(by.css('input#field_idHistory'));
    kodeParsing4Input = element(by.css('input#field_kodeParsing4'));
    selisihSupwarnInput = element(by.css('input#field_selisihSupwarn'));
    timeonInput = element(by.css('input#field_timeon'));
    timeoffInput = element(by.css('input#field_timeoff'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdDistributorInput = function (idDistributor) {
        this.idDistributorInput.sendKeys(idDistributor);
    }

    getIdDistributorInput = function () {
        return this.idDistributorInput.getAttribute('value');
    }

    setNamaInput = function (nama) {
        this.namaInput.sendKeys(nama);
    }

    getNamaInput = function () {
        return this.namaInput.getAttribute('value');
    }

    setStatusInput = function (status) {
        this.statusInput.sendKeys(status);
    }

    getStatusInput = function () {
        return this.statusInput.getAttribute('value');
    }

    setKodeIdInput = function (kodeId) {
        this.kodeIdInput.sendKeys(kodeId);
    }

    getKodeIdInput = function () {
        return this.kodeIdInput.getAttribute('value');
    }

    setPinInput = function (pin) {
        this.pinInput.sendKeys(pin);
    }

    getPinInput = function () {
        return this.pinInput.getAttribute('value');
    }

    setComInput = function (com) {
        this.comInput.sendKeys(com);
    }

    getComInput = function () {
        return this.comInput.getAttribute('value');
    }

    setNoKontakInput = function (noKontak) {
        this.noKontakInput.sendKeys(noKontak);
    }

    getNoKontakInput = function () {
        return this.noKontakInput.getAttribute('value');
    }

    setMetodeInput = function (metode) {
        this.metodeInput.sendKeys(metode);
    }

    getMetodeInput = function () {
        return this.metodeInput.getAttribute('value');
    }

    setKodeParsingInput = function (kodeParsing) {
        this.kodeParsingInput.sendKeys(kodeParsing);
    }

    getKodeParsingInput = function () {
        return this.kodeParsingInput.getAttribute('value');
    }

    setKodeParsing2Input = function (kodeParsing2) {
        this.kodeParsing2Input.sendKeys(kodeParsing2);
    }

    getKodeParsing2Input = function () {
        return this.kodeParsing2Input.getAttribute('value');
    }

    setReplynoInput = function (replyno) {
        this.replynoInput.sendKeys(replyno);
    }

    getReplynoInput = function () {
        return this.replynoInput.getAttribute('value');
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

    setIpInput = function (ip) {
        this.ipInput.sendKeys(ip);
    }

    getIpInput = function () {
        return this.ipInput.getAttribute('value');
    }

    setIsvreInput = function (isvre) {
        this.isvreInput.sendKeys(isvre);
    }

    getIsvreInput = function () {
        return this.isvreInput.getAttribute('value');
    }

    setIsgtwInput = function (isgtw) {
        this.isgtwInput.sendKeys(isgtw);
    }

    getIsgtwInput = function () {
        return this.isgtwInput.getAttribute('value');
    }

    setUgtwInput = function (ugtw) {
        this.ugtwInput.sendKeys(ugtw);
    }

    getUgtwInput = function () {
        return this.ugtwInput.getAttribute('value');
    }

    setIsfilterInput = function (isfilter) {
        this.isfilterInput.sendKeys(isfilter);
    }

    getIsfilterInput = function () {
        return this.isfilterInput.getAttribute('value');
    }

    setParseSaldoInput = function (parseSaldo) {
        this.parseSaldoInput.sendKeys(parseSaldo);
    }

    getParseSaldoInput = function () {
        return this.parseSaldoInput.getAttribute('value');
    }

    setParseHargaInput = function (parseHarga) {
        this.parseHargaInput.sendKeys(parseHarga);
    }

    getParseHargaInput = function () {
        return this.parseHargaInput.getAttribute('value');
    }

    setTiketWrapInput = function (tiketWrap) {
        this.tiketWrapInput.sendKeys(tiketWrap);
    }

    getTiketWrapInput = function () {
        return this.tiketWrapInput.getAttribute('value');
    }

    setIstiketsendInput = function (istiketsend) {
        this.istiketsendInput.sendKeys(istiketsend);
    }

    getIstiketsendInput = function () {
        return this.istiketsendInput.getAttribute('value');
    }

    setPesanTiketInput = function (pesanTiket) {
        this.pesanTiketInput.sendKeys(pesanTiket);
    }

    getPesanTiketInput = function () {
        return this.pesanTiketInput.getAttribute('value');
    }

    setSaldoSupwarnInput = function (saldoSupwarn) {
        this.saldoSupwarnInput.sendKeys(saldoSupwarn);
    }

    getSaldoSupwarnInput = function () {
        return this.saldoSupwarnInput.getAttribute('value');
    }

    setIssortbyInput = function (issortby) {
        this.issortbyInput.sendKeys(issortby);
    }

    getIssortbyInput = function () {
        return this.issortbyInput.getAttribute('value');
    }

    setParseUnitInput = function (parseUnit) {
        this.parseUnitInput.sendKeys(parseUnit);
    }

    getParseUnitInput = function () {
        return this.parseUnitInput.getAttribute('value');
    }

    setIsulangimInput = function (isulangim) {
        this.isulangimInput.sendKeys(isulangim);
    }

    getIsulangimInput = function () {
        return this.isulangimInput.getAttribute('value');
    }

    setIshlrInput = function (ishlr) {
        this.ishlrInput.sendKeys(ishlr);
    }

    getIshlrInput = function () {
        return this.ishlrInput.getAttribute('value');
    }

    setKodeParsing3Input = function (kodeParsing3) {
        this.kodeParsing3Input.sendKeys(kodeParsing3);
    }

    getKodeParsing3Input = function () {
        return this.kodeParsing3Input.getAttribute('value');
    }

    setIdHistoryInput = function (idHistory) {
        this.idHistoryInput.sendKeys(idHistory);
    }

    getIdHistoryInput = function () {
        return this.idHistoryInput.getAttribute('value');
    }

    setKodeParsing4Input = function (kodeParsing4) {
        this.kodeParsing4Input.sendKeys(kodeParsing4);
    }

    getKodeParsing4Input = function () {
        return this.kodeParsing4Input.getAttribute('value');
    }

    setSelisihSupwarnInput = function (selisihSupwarn) {
        this.selisihSupwarnInput.sendKeys(selisihSupwarn);
    }

    getSelisihSupwarnInput = function () {
        return this.selisihSupwarnInput.getAttribute('value');
    }

    setTimeonInput = function (timeon) {
        this.timeonInput.sendKeys(timeon);
    }

    getTimeonInput = function () {
        return this.timeonInput.getAttribute('value');
    }

    setTimeoffInput = function (timeoff) {
        this.timeoffInput.sendKeys(timeoff);
    }

    getTimeoffInput = function () {
        return this.timeoffInput.getAttribute('value');
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
