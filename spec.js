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

    beforeEach(async function () {
        await browser.get('http://localhost:8080/ipb-app');
    });

    it('should Login', async function () {
        await username.sendKeys('qa');
        await password.sendKeys('qa');
        await element(by.name('loginForm:submitForm')).click();
        expect(await browser.getTitle()).toEqual('MY WORK (Build: 12.17-SNAPSHOT)');
    });

    it('should find Customer', async function () {
        await element(by.name('topQuickSearchForm:request')).sendKeys('510022');
        await element(by.name('topQuickSearchForm:quickSearchBtn')).click();
        await browser.sleep(3000);
        expect(await browser.getTitle()).toEqual('Customer View (Build: 12.17-SNAPSHOT)');
    });

    it('should navigate to My Work', async function () {
        await browser.sleep(6000);
        await element(by.xpath(`//*[@id="tabForm:topTabsBarList:0:linkLabel"]`)).click();
        expect(element(by.xpath('//form[@id="taskManagingForm"]')).isPresent()).toBeTruthy();
    });

    it('should check new tasks', async function () {
        await browser.sleep(2000);
        await element(by.xpath(`//*[@id="taskControlsForm:getNextTask"]`)).click();
        await browser.sleep(3000);
        expect(element(by.xpath('//*[@id="noNextTaskPopup"]')).isPresent()).toBeTruthy();
    });

    it('should close pop-up', async function () {
        await browser.sleep(3000);
        const elm = await element(by.xpath(`//*[@id="noNextTaskPopup"]//table//*[@id="noNextTaskPopupButtonOk"]`));
        await browser.executeScript("arguments[0].click();", elm.getWebElement());
        await browser.sleep(3000);
        await expect(await browser.getTitle()).toEqual('MY WORK (Build: 12.17-SNAPSHOT)');
    });
});