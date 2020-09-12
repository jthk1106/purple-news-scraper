const puppeteer = require('puppeteer');
const express = require('express');
const router = express.Router();  

const morgan = require('morgan');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use(morgan('dev'));

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* GET home page. */
router.get('/', async (req, res) => {
    const data = await scrapeFox()
    res.json(data)
})

async function scrapeFox () {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.foxnews.com/us')

    const [first] = await page.$x('//*[@id="wrapper"]/div[2]/div[2]/div/aside/div/div/section[2]/div/ul/li[1]/article/div[2]/h5/a')
    const firstText = await first.getProperty('innerText')
    const firstTitle = await firstText.jsonValue()
    const [firstLink] = await page.$x('//*[@id="wrapper"]/div[2]/div[2]/div/aside/div/div/section[2]/div/ul/li[1]/article/div[2]/h5/a')
    const firstHref = await firstLink.getProperty('href')
    const firstUrl = await firstHref.jsonValue()

    const [second] = await page.$x('//*[@id="wrapper"]/div[2]/div[2]/div/aside/div/div/section[2]/div/ul/li[2]/article/div[2]/h5/a')
    const secondText = await second.getProperty('innerText')
    const secondTitle = await secondText.jsonValue()
    const [secondLink] = await page.$x('//*[@id="wrapper"]/div[2]/div[2]/div/aside/div/div/section[2]/div/ul/li[2]/article/div[2]/h5/a')
    const secondHref = await secondLink.getProperty('href')
    const secondUrl = await secondHref.jsonValue()

    const [third] = await page.$x('//*[@id="wrapper"]/div[2]/div[2]/div/aside/div/div/section[2]/div/ul/li[3]/article/div[2]/h5/a')
    const thirdText = await third.getProperty('innerText')
    const thirdTitle = await thirdText.jsonValue()
    const [thirdLink] = await page.$x('//*[@id="wrapper"]/div[2]/div[2]/div/aside/div/div/section[2]/div/ul/li[3]/article/div[2]/h5/a')
    const thirdHref = await thirdLink.getProperty('href')
    const thirdUrl = await thirdHref.jsonValue()

    const [fourth] = await page.$x('//*[@id="wrapper"]/div[2]/div[2]/div/aside/div/div/section[2]/div/ul/li[4]/article/div[2]/h5/a')
    const fourthText = await fourth.getProperty('innerText')
    const fourthTitle = await fourthText.jsonValue()
    const [fourthLink] = await page.$x('//*[@id="wrapper"]/div[2]/div[2]/div/aside/div/div/section[2]/div/ul/li[4]/article/div[2]/h5/a')
    const fourthHref = await fourthLink.getProperty('href')
    const fourthUrl = await fourthHref.jsonValue()

    await browser.close()

    return [
        {title: firstTitle, url: firstUrl},
        {title: secondTitle, url: secondUrl},
        {title: thirdTitle, url: thirdUrl},
        {title: fourthTitle, url: fourthUrl},
    ]
}

// module.exports = {
//     scrapeFox
// }

module.exports = router