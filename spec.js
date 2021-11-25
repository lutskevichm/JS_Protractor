describe('Protractor Demo', function () {
    browser.waitForAngularEnabled(false);
    //browser.driver.manage().window().setSize(1600, 800);
    browser.driver.manage().window().maximize();
    browser.driver.manage().setTimeouts({
        implicit: 10000,
        pageLoad: 10000,
        script: 10000
    });
    const username = element(by.xpath(`//*[@id="loginForm:j_username"]`));
    const password = element(by.xpath(`//*[@id="loginForm:j_password"]`));

    beforeEach(function () {
        browser.get('http://localhost:8080/ipb-app');
    });

    it('should Login', function () {
        username.sendKeys('qa');
        password.sendKeys('qa');
        element(by.name('loginForm:submitForm')).click();

        expect(browser.getTitle()).toEqual('MY WORK (Build: 12.17-SNAPSHOT)');
    });

    it('should find Customer', function () {
        element(by.name('topQuickSearchForm:request')).sendKeys('510022');
        element(by.name('topQuickSearchForm:quickSearchBtn')).click();
        return new Promise(resolve => {
            setTimeout(resolve, 3000);
        });

        expect(browser.getTitle()).toEqual('Customer View (Build: 12.17-SNAPSHOT)');
    });

    it('should navigate to My Work', function () {
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
        element(by.xpath(`//*[@text="My Work"]`)).click();

        expect(element(by.xpath('//form[@id="taskManagingForm"]')).isPresent()).toBeTruthy();
    });

    it('should check new tasks', function () {
        element(by.name('taskControlsForm:getNextTask')).click();
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });

        expect(element(by.xpath('//[@id="noNextTaskPopup"]')).isPresent()).toBeTruthy();
    });

    it('should close pop-up', function () {
        element(by.name('noNextTaskPopupButtonOk')).click();
        browser.sleep(3000);
        expect(browser.getTitle()).toEqual('MY WORK (Build: 12.17-SNAPSHOT)');
    });
});