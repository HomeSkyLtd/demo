var Lcd = require('lcd'),
lcd = new Lcd({rs: 18, e: 23, data: [12, 16, 20, 21], cols: 16, rows: 2});
 
lcd.on('ready', function () {
  setInterval(function () {
    lcd.setCursor(0, 0);
    lcd.print("Hello, World!", function (err) {
      if (err) {
        throw err;
      }
    });
  }, 1000);
});
 
// If ctrl+c is hit, free resources and exit. 
process.on('SIGINT', function () {
  lcd.close();
  process.exit();
});