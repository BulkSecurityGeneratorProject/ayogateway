import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Operator e2e test', () => {

    let navBarPage: NavBarPage;
    let operatorDialogPage: OperatorDialogPage;
    let operatorComponentsPage: OperatorComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Operators', () => {
        navBarPage.goToEntity('operator');
        operatorComponentsPage = new OperatorComponentsPage();
        expect(operatorComponentsPage.getTitle()).toMatch(/ayogatewayApp.operator.home.title/);

    });

    it('should load create Operator dialog', () => {
        operatorComponentsPage.clickOnCreateButton();
        operatorDialogPage = new OperatorDialogPage();
        expect(operatorDialogPage.getModalTitle()).toMatch(/ayogatewayApp.operator.home.createOrEditLabel/);
        operatorDialogPage.close();
    });

    it('should create and save Operators', () => {
        operatorComponentsPage.clickOnCreateButton();
        operatorDialogPage.setIdOperatorInput('5');
        expect(operatorDialogPage.getIdOperatorInput()).toMatch('5');
        operatorDialogPage.setNamaInput('nama');
        expect(operatorDialogPage.getNamaInput()).toMatch('nama');
        operatorDialogPage.save();
        expect(operatorDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class OperatorComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-operator div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OperatorDialogPage {
    modalTitle = element(by.css('h4#myOperatorLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idOperatorInput = element(by.css('input#field_idOperator'));
    namaInput = element(by.css('input#field_nama'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdOperatorInput = function (idOperator) {
        this.idOperatorInput.sendKeys(idOperator);
    }

    getIdOperatorInput = function () {
        return this.idOperatorInput.getAttribute('value');
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
