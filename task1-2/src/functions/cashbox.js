'use strict';


function Cashbox(history) {
  this.amount = 0;
  this.history = history;
  this.status = [];
  this.open = function(incomingCash) {
      if (typeof(incomingCash) === 'number' && incomingCash >= 0) {
        this.amount = incomingCash;
      }
      this.status = 'open';
      this.history.push('cashbox is open');
    },
    this.addPayment = function(payment = 0, info = '') {
      if (typeof(payment) === 'number' && payment > 0 && this.status === 'open' &&
        typeof(info) === 'string') {
        this.history.push('payment added ' + payment + `(` + info + `)`);
        this.amount += payment;
        return ('cashbox amount = ' + this.amount);
      } else {
        return ('error , amount have not changed');
      }
    },
    this.refundPayment = function(refund = 0, info = '') {
      if (typeof(refund) === 'number' && refund > 0 && this.amount > 0 && this.status === 'open' &&
        typeof(info) === 'string') {
        this.history.push('payment refunded ' + refund + `(` + info + `)`);
        this.amount -= refund;
        return ('cashbox amount = ' + this.amount);
      } else {
        return ('error , amount have not changed');
      }
    };
}






module.exports = Cashbox;