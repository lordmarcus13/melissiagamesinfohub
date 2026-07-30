const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

  console.log('Navigating to local server...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' }).catch(e => console.log(e));
  
  await page.screenshot({ path: 'screenshot.png' });
  console.log('Saved screenshot.png');
  
  await browser.close();
})();
