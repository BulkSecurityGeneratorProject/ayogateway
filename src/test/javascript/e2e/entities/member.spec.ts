import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Member e2e test', () => {

    let navBarPage: NavBarPage;
    let memberDialogPage: MemberDialogPage;
    let memberComponentsPage: MemberComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Members', () => {
        navBarPage.goToEntity('member');
        memberComponentsPage = new MemberComponentsPage();
        expect(memberComponentsPage.getTitle()).toMatch(/ayogatewayApp.member.home.title/);

    });

    it('should load create Member dialog', () => {
        memberComponentsPage.clickOnCreateButton();
        memberDialogPage = new MemberDialogPage();
        expect(memberDialogPage.getModalTitle()).toMatch(/ayogatewayApp.member.home.createOrEditLabel/);
        memberDialogPage.close();
    });

    it('should create and save Members', () => {
        memberComponentsPage.clickOnCreateButton();
        memberDialogPage.setIdMemberInput('idMember');
        expect(memberDialogPage.getIdMemberInput()).toMatch('idMember');
        memberDialogPage.setTglRegisterInput('2000-12-31');
        expect(memberDialogPage.getTglRegisterInput()).toMatch('2000-12-31');
        memberDialogPage.setNamaInput('nama');
        expect(memberDialogPage.getNamaInput()).toMatch('nama');
        memberDialogPage.setAlamatInput('alamat');
        expect(memberDialogPage.getAlamatInput()).toMatch('alamat');
        memberDialogPage.setPinInput('pin');
        expect(memberDialogPage.getPinInput()).toMatch('pin');
        memberDialogPage.setStatusInput('5');
        expect(memberDialogPage.getStatusInput()).toMatch('5');
        memberDialogPage.setSaldoInput('5');
        expect(memberDialogPage.getSaldoInput()).toMatch('5');
        memberDialogPage.setIdUplineInput('idUpline');
        expect(memberDialogPage.getIdUplineInput()).toMatch('idUpline');
        memberDialogPage.setKodeLevelInput('kodeLevel');
        expect(memberDialogPage.getKodeLevelInput()).toMatch('kodeLevel');
        memberDialogPage.setTglInputInput(12310020012301);
        expect(memberDialogPage.getTglInputInput()).toMatch('2001-12-31T02:30');
        memberDialogPage.setUserInputInput('userInput');
        expect(memberDialogPage.getUserInputInput()).toMatch('userInput');
        memberDialogPage.setTglUpdateInput(12310020012301);
        expect(memberDialogPage.getTglUpdateInput()).toMatch('2001-12-31T02:30');
        memberDialogPage.setUserUpdateInput('userUpdate');
        expect(memberDialogPage.getUserUpdateInput()).toMatch('userUpdate');
        memberDialogPage.setIdMasterInput('idMaster');
        expect(memberDialogPage.getIdMasterInput()).toMatch('idMaster');
        memberDialogPage.setRptTrxInput('5');
        expect(memberDialogPage.getRptTrxInput()).toMatch('5');
        memberDialogPage.setSelisihInput('5');
        expect(memberDialogPage.getSelisihInput()).toMatch('5');
        memberDialogPage.setCounterInput('5');
        expect(memberDialogPage.getCounterInput()).toMatch('5');
        memberDialogPage.setDongleNoInput('dongleNo');
        expect(memberDialogPage.getDongleNoInput()).toMatch('dongleNo');
        memberDialogPage.setHead2headInput('5');
        expect(memberDialogPage.getHead2headInput()).toMatch('5');
        memberDialogPage.setYmidInput('ymid');
        expect(memberDialogPage.getYmidInput()).toMatch('ymid');
        memberDialogPage.setIprptInput('iprpt');
        expect(memberDialogPage.getIprptInput()).toMatch('iprpt');
        memberDialogPage.setLastTrxInput(12310020012301);
        expect(memberDialogPage.getLastTrxInput()).toMatch('2001-12-31T02:30');
        memberDialogPage.setRefInput('ref');
        expect(memberDialogPage.getRefInput()).toMatch('ref');
        memberDialogPage.setCryptInput('crypt');
        expect(memberDialogPage.getCryptInput()).toMatch('crypt');
        memberDialogPage.setGtalkidInput('gtalkid');
        expect(memberDialogPage.getGtalkidInput()).toMatch('gtalkid');
        memberDialogPage.setVremsgidInput('vremsgid');
        expect(memberDialogPage.getVremsgidInput()).toMatch('vremsgid');
        memberDialogPage.setKodeposInput('kodepos');
        expect(memberDialogPage.getKodeposInput()).toMatch('kodepos');
        memberDialogPage.setIswarnInput('5');
        expect(memberDialogPage.getIswarnInput()).toMatch('5');
        memberDialogPage.setMsnidInput('msnid');
        expect(memberDialogPage.getMsnidInput()).toMatch('msnid');
        memberDialogPage.setIdlogsalInput('5');
        expect(memberDialogPage.getIdlogsalInput()).toMatch('5');
        memberDialogPage.setLastKodetrxInput('5');
        expect(memberDialogPage.getLastKodetrxInput()).toMatch('5');
        memberDialogPage.setLastIdtrxInput('5');
        expect(memberDialogPage.getLastIdtrxInput()).toMatch('5');
        memberDialogPage.setTelebotidInput('telebotid');
        expect(memberDialogPage.getTelebotidInput()).toMatch('telebotid');
        memberDialogPage.setTelegramidInput('telegramid');
        expect(memberDialogPage.getTelegramidInput()).toMatch('telegramid');
        memberDialogPage.setIsownerInput('5');
        expect(memberDialogPage.getIsownerInput()).toMatch('5');
        memberDialogPage.setCryptownerInput('cryptowner');
        expect(memberDialogPage.getCryptownerInput()).toMatch('cryptowner');
        memberDialogPage.setPinownerInput('pinowner');
        expect(memberDialogPage.getPinownerInput()).toMatch('pinowner');
        memberDialogPage.save();
        expect(memberDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MemberComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-member div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MemberDialogPage {
    modalTitle = element(by.css('h4#myMemberLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idMemberInput = element(by.css('input#field_idMember'));
    tglRegisterInput = element(by.css('input#field_tglRegister'));
    namaInput = element(by.css('input#field_nama'));
    alamatInput = element(by.css('input#field_alamat'));
    pinInput = element(by.css('input#field_pin'));
    statusInput = element(by.css('input#field_status'));
    saldoInput = element(by.css('input#field_saldo'));
    idUplineInput = element(by.css('input#field_idUpline'));
    kodeLevelInput = element(by.css('input#field_kodeLevel'));
    tglInputInput = element(by.css('input#field_tglInput'));
    userInputInput = element(by.css('input#field_userInput'));
    tglUpdateInput = element(by.css('input#field_tglUpdate'));
    userUpdateInput = element(by.css('input#field_userUpdate'));
    idMasterInput = element(by.css('input#field_idMaster'));
    rptTrxInput = element(by.css('input#field_rptTrx'));
    selisihInput = element(by.css('input#field_selisih'));
    counterInput = element(by.css('input#field_counter'));
    dongleNoInput = element(by.css('input#field_dongleNo'));
    head2headInput = element(by.css('input#field_head2head'));
    ymidInput = element(by.css('input#field_ymid'));
    iprptInput = element(by.css('input#field_iprpt'));
    lastTrxInput = element(by.css('input#field_lastTrx'));
    refInput = element(by.css('input#field_ref'));
    cryptInput = element(by.css('input#field_crypt'));
    gtalkidInput = element(by.css('input#field_gtalkid'));
    vremsgidInput = element(by.css('input#field_vremsgid'));
    kodeposInput = element(by.css('input#field_kodepos'));
    iswarnInput = element(by.css('input#field_iswarn'));
    msnidInput = element(by.css('input#field_msnid'));
    idlogsalInput = element(by.css('input#field_idlogsal'));
    lastKodetrxInput = element(by.css('input#field_lastKodetrx'));
    lastIdtrxInput = element(by.css('input#field_lastIdtrx'));
    telebotidInput = element(by.css('input#field_telebotid'));
    telegramidInput = element(by.css('input#field_telegramid'));
    isownerInput = element(by.css('input#field_isowner'));
    cryptownerInput = element(by.css('input#field_cryptowner'));
    pinownerInput = element(by.css('input#field_pinowner'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdMemberInput = function (idMember) {
        this.idMemberInput.sendKeys(idMember);
    }

    getIdMemberInput = function () {
        return this.idMemberInput.getAttribute('value');
    }

    setTglRegisterInput = function (tglRegister) {
        this.tglRegisterInput.sendKeys(tglRegister);
    }

    getTglRegisterInput = function () {
        return this.tglRegisterInput.getAttribute('value');
    }

    setNamaInput = function (nama) {
        this.namaInput.sendKeys(nama);
    }

    getNamaInput = function () {
        return this.namaInput.getAttribute('value');
    }

    setAlamatInput = function (alamat) {
        this.alamatInput.sendKeys(alamat);
    }

    getAlamatInput = function () {
        return this.alamatInput.getAttribute('value');
    }

    setPinInput = function (pin) {
        this.pinInput.sendKeys(pin);
    }

    getPinInput = function () {
        return this.pinInput.getAttribute('value');
    }

    setStatusInput = function (status) {
        this.statusInput.sendKeys(status);
    }

    getStatusInput = function () {
        return this.statusInput.getAttribute('value');
    }

    setSaldoInput = function (saldo) {
        this.saldoInput.sendKeys(saldo);
    }

    getSaldoInput = function () {
        return this.saldoInput.getAttribute('value');
    }

    setIdUplineInput = function (idUpline) {
        this.idUplineInput.sendKeys(idUpline);
    }

    getIdUplineInput = function () {
        return this.idUplineInput.getAttribute('value');
    }

    setKodeLevelInput = function (kodeLevel) {
        this.kodeLevelInput.sendKeys(kodeLevel);
    }

    getKodeLevelInput = function () {
        return this.kodeLevelInput.getAttribute('value');
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

    setIdMasterInput = function (idMaster) {
        this.idMasterInput.sendKeys(idMaster);
    }

    getIdMasterInput = function () {
        return this.idMasterInput.getAttribute('value');
    }

    setRptTrxInput = function (rptTrx) {
        this.rptTrxInput.sendKeys(rptTrx);
    }

    getRptTrxInput = function () {
        return this.rptTrxInput.getAttribute('value');
    }

    setSelisihInput = function (selisih) {
        this.selisihInput.sendKeys(selisih);
    }

    getSelisihInput = function () {
        return this.selisihInput.getAttribute('value');
    }

    setCounterInput = function (counter) {
        this.counterInput.sendKeys(counter);
    }

    getCounterInput = function () {
        return this.counterInput.getAttribute('value');
    }

    setDongleNoInput = function (dongleNo) {
        this.dongleNoInput.sendKeys(dongleNo);
    }

    getDongleNoInput = function () {
        return this.dongleNoInput.getAttribute('value');
    }

    setHead2headInput = function (head2head) {
        this.head2headInput.sendKeys(head2head);
    }

    getHead2headInput = function () {
        return this.head2headInput.getAttribute('value');
    }

    setYmidInput = function (ymid) {
        this.ymidInput.sendKeys(ymid);
    }

    getYmidInput = function () {
        return this.ymidInput.getAttribute('value');
    }

    setIprptInput = function (iprpt) {
        this.iprptInput.sendKeys(iprpt);
    }

    getIprptInput = function () {
        return this.iprptInput.getAttribute('value');
    }

    setLastTrxInput = function (lastTrx) {
        this.lastTrxInput.sendKeys(lastTrx);
    }

    getLastTrxInput = function () {
        return this.lastTrxInput.getAttribute('value');
    }

    setRefInput = function (ref) {
        this.refInput.sendKeys(ref);
    }

    getRefInput = function () {
        return this.refInput.getAttribute('value');
    }

    setCryptInput = function (crypt) {
        this.cryptInput.sendKeys(crypt);
    }

    getCryptInput = function () {
        return this.cryptInput.getAttribute('value');
    }

    setGtalkidInput = function (gtalkid) {
        this.gtalkidInput.sendKeys(gtalkid);
    }

    getGtalkidInput = function () {
        return this.gtalkidInput.getAttribute('value');
    }

    setVremsgidInput = function (vremsgid) {
        this.vremsgidInput.sendKeys(vremsgid);
    }

    getVremsgidInput = function () {
        return this.vremsgidInput.getAttribute('value');
    }

    setKodeposInput = function (kodepos) {
        this.kodeposInput.sendKeys(kodepos);
    }

    getKodeposInput = function () {
        return this.kodeposInput.getAttribute('value');
    }

    setIswarnInput = function (iswarn) {
        this.iswarnInput.sendKeys(iswarn);
    }

    getIswarnInput = function () {
        return this.iswarnInput.getAttribute('value');
    }

    setMsnidInput = function (msnid) {
        this.msnidInput.sendKeys(msnid);
    }

    getMsnidInput = function () {
        return this.msnidInput.getAttribute('value');
    }

    setIdlogsalInput = function (idlogsal) {
        this.idlogsalInput.sendKeys(idlogsal);
    }

    getIdlogsalInput = function () {
        return this.idlogsalInput.getAttribute('value');
    }

    setLastKodetrxInput = function (lastKodetrx) {
        this.lastKodetrxInput.sendKeys(lastKodetrx);
    }

    getLastKodetrxInput = function () {
        return this.lastKodetrxInput.getAttribute('value');
    }

    setLastIdtrxInput = function (lastIdtrx) {
        this.lastIdtrxInput.sendKeys(lastIdtrx);
    }

    getLastIdtrxInput = function () {
        return this.lastIdtrxInput.getAttribute('value');
    }

    setTelebotidInput = function (telebotid) {
        this.telebotidInput.sendKeys(telebotid);
    }

    getTelebotidInput = function () {
        return this.telebotidInput.getAttribute('value');
    }

    setTelegramidInput = function (telegramid) {
        this.telegramidInput.sendKeys(telegramid);
    }

    getTelegramidInput = function () {
        return this.telegramidInput.getAttribute('value');
    }

    setIsownerInput = function (isowner) {
        this.isownerInput.sendKeys(isowner);
    }

    getIsownerInput = function () {
        return this.isownerInput.getAttribute('value');
    }

    setCryptownerInput = function (cryptowner) {
        this.cryptownerInput.sendKeys(cryptowner);
    }

    getCryptownerInput = function () {
        return this.cryptownerInput.getAttribute('value');
    }

    setPinownerInput = function (pinowner) {
        this.pinownerInput.sendKeys(pinowner);
    }

    getPinownerInput = function () {
        return this.pinownerInput.getAttribute('value');
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
