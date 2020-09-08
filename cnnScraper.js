const puppeteer = require('puppeteer');

async function scrapeCnn() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.cnn.com/us')

    const [first] = await page.$x('//*[@id="us-zone-1"]/div[2]/div/div[1]/ul/li[1]/article/div/div[2]/h3/a/span[1]')
    const firstText = await first.getProperty('innerText')
    const firstTitle = await firstText.jsonValue()
    const [firstLink] = await page.$x('//*[@id="us-zone-1"]/div[2]/div/div[1]/ul/li[1]/article/div/div[2]/h3/a')
    const firstHref = await firstLink.getProperty('href')
    const firstUrl = await firstHref.jsonValue()

    const [second] = await page.$x('//*[@id="us-zone-1"]/div[2]/div/div[1]/ul/li[2]/article/div/div/h3/a/span[1]')
    const secondText = await second.getProperty('innerText')
    const secondTitle = await secondText.jsonValue()
    const [secondLink] = await page.$x('//*[@id="us-zone-1"]/div[2]/div/div[1]/ul/li[2]/article/div/div/h3/a')
    const secondHref = await secondLink.getProperty('href')
    const secondUrl = await secondHref.jsonValue()

    const [third] = await page.$x('//*[@id="us-zone-1"]/div[2]/div/div[1]/ul/li[3]/article/div/div/h3/a/span[1]')
    const thirdText = await third.getProperty('innerText')
    const thirdTitle = await thirdText.jsonValue()
    const [thirdLink] = await page.$x('//*[@id="us-zone-1"]/div[2]/div/div[1]/ul/li[3]/article/div/div/h3/a')
    const thirdHref = await thirdLink.getProperty('href')
    const thirdUrl = await thirdHref.jsonValue()

    const [fourth] = await page.$x('//*[@id="us-zone-1"]/div[2]/div/div[1]/ul/li[4]/article/div/div/h3/a/span[1]')
    const fourthText = await fourth.getProperty('innerText')
    const fourthTitle = await fourthText.jsonValue()
    const [fourthLink] = await page.$x('//*[@id="us-zone-1"]/div[2]/div/div[1]/ul/li[4]/article/div/div/h3/a')
    const fourthHref = await fourthLink.getProperty('href')
    const fourthUrl = await fourthHref.jsonValue()

    await browser.close()

    return [
        {title: firstTitle, url: firstUrl},
        {title: secondTitle, url: secondUrl},
        {title: thirdTitle, url: thirdUrl},
        {title: fourthTitle, url: fourthUrl},
    ]
};

module.exports = {
    scrapeCnn
}