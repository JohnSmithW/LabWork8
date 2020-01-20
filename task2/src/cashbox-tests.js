'use strict';

const cashbox = require('./cashbox.js');


var assert = require('assert');
describe('cashbox', function() {
  describe('open', function() {
    it('should set cashbox status on open and set the start value of amount', function() {
      cashbox.open();
      assert.equal(cashbox.status, 'open');
      assert.equal(cashbox.history, 'cashbox is open');
      assert.equal(cashbox.amount, 0);
    });
    it('if open has a value amount should get a value of this', function() {
      cashbox.open(1);
      assert.equal(cashbox.amount, 1);
      cashbox.open(-1);
      assert.equal(cashbox.amount, 1);
      cashbox.open(0);
      assert.equal(cashbox.amount, 0);
      cashbox.open('text');
      assert.equal(cashbox.amount, 0);
      cashbox.open(NaN);
      assert.equal(cashbox.amount, 0);
      cashbox.open(undefined);
      assert.equal(cashbox.amount, 0);
      cashbox.open(Object);
      assert.equal(cashbox.amount, 0);
    });
  });
  describe('addPayment', function() {
    it('should set cashbox status on open and set the start value of amount', function() {

    });
  });
});





/*
var cashbox = {
  amount: 0,
  history: [], // сохранять операции над кассой здесь
  status: [],
  open: function(incomingCash) {
    this.history.push('cashbox is open');
    incomingCash = this.amount;
    this.status = 'open';
  },
  addPayment: function(payment = 0, info = '') {
    this.history.push('payment added' + `(` + info + `)`);
    if (typeof(payment) == 'number' && payment > 0 && this.status == 'open') {
      this.amount += payment;
      return ('cashbox amount = ' + this.amount);
    } else {
      return ('error , amount have not changed');
    }
  },
  refundPayment: function(refund = 0, info = '') {
    this.history.push('payment refunded' + `(` + info + `)`);
    if (typeof(refund) == 'number' && refund > 0 && this.amount > 0 && this.status == 'open') {
      this.amount -= refund;
      return ('cashbox amount = ' + this.amount);
    } else {
      return ('error , amount have not changed');
    }
  },
};*/