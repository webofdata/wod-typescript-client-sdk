
tsc . 
browserify webofdata.js app.js -o bundle.js
mocha webofdata.test.js --reporter mochawesome --reporter-options reportDir=TestResults



