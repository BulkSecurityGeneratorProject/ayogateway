import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Koneksi e2e test', () => {

    let navBarPage: NavBarPage;
    let koneksiDialogPage: KoneksiDialogPage;
    let koneksiComponentsPage: KoneksiComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Koneksis', () => {
        navBarPage.goToEntity('koneksi');
        koneksiComponentsPage = new KoneksiComponentsPage();
        expect(koneksiComponentsPage.getTitle()).toMatch(/ayogatewayApp.koneksi.home.title/);

    });

    it('should load create Koneksi dialog', () => {
        koneksiComponentsPage.clickOnCreateButton();
        koneksiDialogPage = new KoneksiDialogPage();
        expect(koneksiDialogPage.getModalTitle()).toMatch(/ayogatewayApp.koneksi.home.createOrEditLabel/);
        koneksiDialogPage.close();
    });

    it('should create and save Koneksis', () => {
        koneksiComponentsPage.clickOnCreateButton();
        koneksiDialogPage.setMetodeInput('5');
        expect(koneksiDialogPage.getMetodeInput()).toMatch('5');
        koneksiDialogPage.setKetInput('ket');
        expect(koneksiDialogPage.getKetInput()).toMatch('ket');
        koneksiDialogPage.save();
        expect(koneksiDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class KoneksiComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-koneksi div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class KoneksiDialogPage {
    modalTitle = element(by.css('h4#myKoneksiLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    metodeInput = element(by.css('input#field_metode'));
    ketInput = element(by.css('input#field_ket'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setMetodeInput = function (metode) {
        this.metodeInput.sendKeys(metode);
    }

    getMetodeInput = function () {
        return this.metodeInput.getAttribute('value');
    }

    setKetInput = function (ket) {
        this.ketInput.sendKeys(ket);
    }

    getKetInput = function () {
        return this.ketInput.getAttribute('value');
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
