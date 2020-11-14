const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/getRate', calculateRate)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

function calculateRate(req, res) {
    const weight = req.query.weight;
    const mailType = req.query.postage;
    let rate = 0;
    let type = 'None';
    switch (mailType) {
        case 'stamped':
            rate = getStamped(weight);
            type = "Letters (Stamped)";
            break;
        case 'metered':
            rate = getMetered(weight);
            type = "Letters (Metered)"
            break;
        case 'flats':
            rate = getFlats(weight);
            type = "Large Envelopes (Flats)";
            break;
        case 'first_class':
            rate = getFirstClass(weight);
            type = "First-Class Package Service—Retail";
            break;
        default:
            rate = 0;
    }

    if (weight == 0) {rate = 0;}
    const params = {weight: weight, mailType: type, rate: rate};

    res.render('pages/display_rate', params);

}

function getStamped(weight) {
    if (weight <= 1) {return .55;}
    if (weight <= 2) {return .70;}
    if (weight <= 3) {return .85;}
    if (weight <= 3.5) {return 1.00;}
    return 0;
}

function getMetered(weight) {
    if (weight <= 1) {return .50;}
    if (weight <= 2) {return .65;}
    if (weight <= 3) {return .80;}
    if (weight <= 3.5) {return .95;}
    return 0;
}

function getFlats(weight) {
    if (weight <= 1) {return 1.00;}
    if (weight <= 2) {return 1.20;}
    if (weight <= 3) {return 1.40;}
    if (weight <= 4) {return 1.60;}
    if (weight <= 5) {return 1.80;}
    if (weight <= 6) {return 2.00;}
    if (weight <= 7) {return 2.20;}
    if (weight <= 8) {return 2.40;}
    if (weight <= 9) {return 2.60;}
    if (weight <= 10) {return 2.80;}
    if (weight <= 11) {return 3.00;}
    if (weight <= 12) {return 3.20;}
    if (weight <= 13) {return 3.40;}
    return 0;
}

function getFirstClass(weight) {
    if (weight <= 1) {return 3.80;}
    if (weight <= 2) {return 3.80;}
    if (weight <= 3) {return 3.80;}
    if (weight <= 4) {return 3.80;}
    if (weight <= 5) {return 4.60;}
    if (weight <= 6) {return 4.60;}
    if (weight <= 7) {return 4.60;}
    if (weight <= 8) {return 4.60;}
    if (weight <= 9) {return 5.30;}
    if (weight <= 10) {return 5.30;}
    if (weight <= 11) {return 5.30;}
    if (weight <= 12) {return 5.30;}
    if (weight <= 13) {return 5.90;}
    return 0;
}