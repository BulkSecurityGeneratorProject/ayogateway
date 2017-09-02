import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('MemberHp e2e test', () => {

    let navBarPage: NavBarPage;
    let memberHpDialogPage: MemberHpDialogPage;
    let memberHpComponentsPage: MemberHpComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load MemberHps', () => {
        navBarPage.goToEntity('member-hp');
        memberHpComponentsPage = new MemberHpComponentsPage();
        expect(memberHpComponentsPage.getTitle()).toMatch(/ayogatewayApp.memberHp.home.title/);

    });

    it('should load create MemberHp dialog', () => {
        memberHpComponentsPage.clickOnCreateButton();
        memberHpDialogPage = new MemberHpDialogPage();
        expect(memberHpDialogPage.getModalTitle()).toMatch(/ayogatewayApp.memberHp.home.createOrEditLabel/);
        memberHpDialogPage.close();
    });

    it('should create and save MemberHps', () => {
        memberHpComponentsPage.clickOnCreateButton();
        memberHpDialogPage.setIdMemberInput('idMember');
        expect(memberHpDialogPage.getIdMemberInput()).toMatch('idMember');
        memberHpDialogPage.setHpInput('hp');
        expect(memberHpDialogPage.getHpInput()).toMatch('hp');
        memberHpDialogPage.setTypeimInput('5');
        expect(memberHpDialogPage.getTypeimInput()).toMatch('5');
        memberHpDialogPage.setIstrxInput('5');
        expect(memberHpDialogPage.getIstrxInput()).toMatch('5');
        memberHpDialogPage.setCryptInput('crypt');
        expect(memberHpDialogPage.getCryptInput()).toMatch('crypt');
        memberHpDialogPage.setTypemsgInput('5');
        expect(memberHpDialogPage.getTypemsgInput()).toMatch('5');
        memberHpDialogPage.memberSelectLastOption();
        memberHpDialogPage.save();
        expect(memberHpDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MemberHpComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-member-hp div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MemberHpDialogPage {
    modalTitle = element(by.css('h4#myMemberHpLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idMemberInput = element(by.css('input#field_idMember'));
    hpInput = element(by.css('input#field_hp'));
    typeimInput = element(by.css('input#field_typeim'));
    istrxInput = element(by.css('input#field_istrx'));
    cryptInput = element(by.css('input#field_crypt'));
    typemsgInput = element(by.css('input#field_typemsg'));
    memberSelect = element(by.css('select#field_member'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdMemberInput = function (idMember) {
        this.idMemberInput.sendKeys(idMember);
    }

    getIdMemberInput = function () {
        return this.idMemberInput.getAttribute('value');
    }

    setHpInput = function (hp) {
        this.hpInput.sendKeys(hp);
    }

    getHpInput = function () {
        return this.hpInput.getAttribute('value');
    }

    setTypeimInput = function (typeim) {
        this.typeimInput.sendKeys(typeim);
    }

    getTypeimInput = function () {
        return this.typeimInput.getAttribute('value');
    }

    setIstrxInput = function (istrx) {
        this.istrxInput.sendKeys(istrx);
    }

    getIstrxInput = function () {
        return this.istrxInput.getAttribute('value');
    }

    setCryptInput = function (crypt) {
        this.cryptInput.sendKeys(crypt);
    }

    getCryptInput = function () {
        return this.cryptInput.getAttribute('value');
    }

    setTypemsgInput = function (typemsg) {
        this.typemsgInput.sendKeys(typemsg);
    }

    getTypemsgInput = function () {
        return this.typemsgInput.getAttribute('value');
    }

    memberSelectLastOption = function () {
        this.memberSelect.all(by.tagName('option')).last().click();
    }

    memberSelectOption = function (option) {
        this.memberSelect.sendKeys(option);
    }

    getMemberSelect = function () {
        return this.memberSelect;
    }

    getMemberSelectedOption = function () {
        return this.memberSelect.element(by.css('option:checked')).getText();
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
