const express = require('express');
const moment = require('moment');

const app = express();

app.get('/', (req, res) => {
    res.end('Go to /api/:date');
});

app.get('/api/:date', (req, res) => {
    const date = req.params.date;

    let unixTime = null;
    let naturalTime = null;

    if (/^\d{8,}$/.test(date)) {
        unixTime = date;
        naturalTime = moment(date, 'X').format('MMMM D, YYYY');
    } else {
        const parsedDate = moment(date, 'MMMM D, YYYY');
        if (parsedDate.isValid()) {
            naturalTime = date;
            unixTime = parsedDate.unix();
        }
    }

    res.json({
        unix: unixTime,
        natural: naturalTime
    });

    res.end();
});

app.listen(3000, () => console.log('Server started on port 3000'));