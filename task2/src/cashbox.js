'use strict';

var cashbox = {
  amount: 0,
  history: [],
  status: [],
  open: function(incomingCash) {
    if (typeof(incomingCash) == 'number' && incomingCash >= 0) {
      this.amount = incomingCash;
    }
    this.status = 'open';
    this.history.push('cashbox is open');
  },
  addPayment: function(payment = 0, info = '') {
    if (typeof(payment) == 'number' && payment > 0 && this.status == 'open' && typeof(info) == 'string') {
      this.history.push('payment added ' + payment + `(` + info + `)`);
      this.amount += payment;
      return ('cashbox amount = ' + this.amount);
    } else {
      return ('error , amount have not changed');
    }
  },
  refundPayment: function(refund = 0, info = '') {
    if (typeof(refund) == 'number' && refund > 0 && this.amount > 0 && this.status == 'open' && typeof(info) == 'string') {
      this.history.push('payment refunded ' + refund + `(` + info + `)`);
      this.amount -= refund;
      return ('cashbox amount = ' + this.amount);
    } else {
      return ('error , amount have not changed');
    }
  },
};

module.exports = cashbox;