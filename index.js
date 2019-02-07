const http = require('http');
const express = require('express');
const app = express();

app.use((req,res,next) => {
    req.middleware = [];
    next();
});

function mw1(req,res,next) {
    req.middleware.push('mw1');
    next();
}

function mw2(req,res,next) {
    req.middleware.push('mw2');
    next();
}

function mw3(req,res,next) {
    req.middleware.push('mw3');
    next();
}

function mw4(opition){
    return function (req,res) {
        res.end(JSON.stringify(req.middleware));
    }
}

app.use('/',mw1);

app.get('/lai',mw2);

app.post('/jia',mw3);

app.use(mw4());

const server = http.createServer(app);
server.listen(10000);