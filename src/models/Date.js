// DateModel.js
const moment = require('moment');

class DateModel {
    constructor(targetDate) {
        this.targetDate = moment(targetDate);
    }

    static today() {
        return moment().format('YYYY-MM-DD');
    }

    daysSince() {
        return moment().diff(this.targetDate, 'days');
    }
}

module.exports = DateModel;
