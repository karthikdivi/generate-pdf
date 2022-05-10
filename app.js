const puppeteer = require(`puppeteer`);

exports.handler = async (event) => {
    let url = event.url || (event.body)? event.body.url: null;
    if(!url){
        const response = {
            statusCode: 400,
            body: JSON.stringify('Please provide URL!'),
        };  
        return response;  
    }

    var browser;
    try {
        browser = await puppeteer.launch({  headless: true, args: [`--window-size=1920,1080`], args: ['--no-sandbox'] });
        let page = await browser.newPage();
        await page.goto(req.query.url, {
            waitUntil: 'networkidle0',
        });
        await page.emulateMediaType("screen");
        const pdfBuffer = await page.pdf({  printBackground: true });
        res.set("Content-Type", "application/pdf");
        
        const response = {
            statusCode: 200,
            headers: {
                'Content-type':"application/pdf",
            },
            body: JSON.stringify(pdfBuffer),
        };
        return response;
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            body: e
        }
    } finally {
        await browser.close();
    }  
};
