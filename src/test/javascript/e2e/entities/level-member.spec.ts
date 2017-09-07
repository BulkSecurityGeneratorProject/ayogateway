import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('LevelMember e2e test', () => {

    let navBarPage: NavBarPage;
    let levelMemberDialogPage: LevelMemberDialogPage;
    let levelMemberComponentsPage: LevelMemberComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load LevelMembers', () => {
        navBarPage.goToEntity('level-member');
        levelMemberComponentsPage = new LevelMemberComponentsPage();
        expect(levelMemberComponentsPage.getTitle()).toMatch(/ayogatewayApp.levelMember.home.title/);

    });

    it('should load create LevelMember dialog', () => {
        levelMemberComponentsPage.clickOnCreateButton();
        levelMemberDialogPage = new LevelMemberDialogPage();
        expect(levelMemberDialogPage.getModalTitle()).toMatch(/ayogatewayApp.levelMember.home.createOrEditLabel/);
        levelMemberDialogPage.close();
    });

    it('should create and save LevelMembers', () => {
        levelMemberComponentsPage.clickOnCreateButton();
        levelMemberDialogPage.setKodeLevelInput('kodeLevel');
        expect(levelMemberDialogPage.getKodeLevelInput()).toMatch('kodeLevel');
        levelMemberDialogPage.setNamaInput('nama');
        expect(levelMemberDialogPage.getNamaInput()).toMatch('nama');
        levelMemberDialogPage.save();
        expect(levelMemberDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LevelMemberComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-level-member div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LevelMemberDialogPage {
    modalTitle = element(by.css('h4#myLevelMemberLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    kodeLevelInput = element(by.css('input#field_kodeLevel'));
    namaInput = element(by.css('input#field_nama'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setKodeLevelInput = function (kodeLevel) {
        this.kodeLevelInput.sendKeys(kodeLevel);
    }

    getKodeLevelInput = function () {
        return this.kodeLevelInput.getAttribute('value');
    }

    setNamaInput = function (nama) {
        this.namaInput.sendKeys(nama);
    }

    getNamaInput = function () {
        return this.namaInput.getAttribute('value');
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
