import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Denom e2e test', () => {

    let navBarPage: NavBarPage;
    let denomDialogPage: DenomDialogPage;
    let denomComponentsPage: DenomComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Denoms', () => {
        navBarPage.goToEntity('denom');
        denomComponentsPage = new DenomComponentsPage();
        expect(denomComponentsPage.getTitle()).toMatch(/ayogatewayApp.denom.home.title/);

    });

    it('should load create Denom dialog', () => {
        denomComponentsPage.clickOnCreateButton();
        denomDialogPage = new DenomDialogPage();
        expect(denomDialogPage.getModalTitle()).toMatch(/ayogatewayApp.denom.home.createOrEditLabel/);
        denomDialogPage.close();
    });

    it('should create and save Denoms', () => {
        denomComponentsPage.clickOnCreateButton();
        denomDialogPage.setJmlDenomInput('5');
        expect(denomDialogPage.getJmlDenomInput()).toMatch('5');
        denomDialogPage.save();
        expect(denomDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DenomComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-denom div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DenomDialogPage {
    modalTitle = element(by.css('h4#myDenomLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    jmlDenomInput = element(by.css('input#field_jmlDenom'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setJmlDenomInput = function (jmlDenom) {
        this.jmlDenomInput.sendKeys(jmlDenom);
    }

    getJmlDenomInput = function () {
        return this.jmlDenomInput.getAttribute('value');
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
