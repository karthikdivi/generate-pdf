const puppeteer = require(`puppeteer`);

exports.generate_pdf = async (req, res) => {
    console.log(`url: ${req.query.url}`);
    if(!req.query.url){
        res.status(200).send("please provide url query param");
    }
    var browser;
    try {
        browser = await puppeteer.launch({  headless: true, args: [`--window-size=1920,1080`], args: ['--no-sandbox'] });
        let page = await browser.newPage();
        await page.goto(req.query.url);
        await page.emulateMediaType("screen");
        const pdfBuffer = await page.pdf({  printBackground: true });
        res.set("Content-Type", "application/pdf");
        res.status(200).send(pdfBuffer);

    } catch (e) {
        console.log(e);
        res.status(200).send(e);
    } finally {
        await browser.close();
    }    
}