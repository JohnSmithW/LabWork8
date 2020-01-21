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
    it('should add payment operation to the history', function() {
      cashbox.addPayment(100);
      assert.deepEqual(cashbox.history, ['cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'payment added 100()']);
      cashbox.addPayment(100, 'bills');
      assert.deepEqual(cashbox.history, ['cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'payment added 100()', 'payment added 100(bills)']);
      cashbox.addPayment(NaN);
      assert.deepEqual(cashbox.history, ['cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'payment added 100()', 'payment added 100(bills)']);
      cashbox.addPayment(undefined);
      assert.deepEqual(cashbox.history, ['cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'payment added 100()', 'payment added 100(bills)']);
      cashbox.addPayment(Object, 'bills');
      assert.deepEqual(cashbox.history, ['cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'payment added 100()', 'payment added 100(bills)']);
      cashbox.addPayment(100, 200);
      assert.deepEqual(cashbox.history, ['cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'payment added 100()', 'payment added 100(bills)']);
      cashbox.addPayment('100', 'bills');
      assert.deepEqual(cashbox.history, ['cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'payment added 100()', 'payment added 100(bills)']);
      cashbox.addPayment(500, undefined);
      assert.deepEqual(cashbox.history, ['cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'payment added 100()', 'payment added 100(bills)', 'payment added 500()']);
    });
    it('should add the payment value to amount', function() {
      cashbox.addPayment(100);
      assert.deepEqual(cashbox.amount, 800);
      cashbox.addPayment(0);
      assert.deepEqual(cashbox.amount, 800);
      cashbox.addPayment();
      assert.deepEqual(cashbox.amount, 800);
      cashbox.addPayment(undefined);
      assert.deepEqual(cashbox.amount, 800);
      cashbox.addPayment(NaN);
      assert.deepEqual(cashbox.amount, 800);
      cashbox.addPayment('100');
      assert.deepEqual(cashbox.amount, 800);
      cashbox.addPayment(Object);
      assert.deepEqual(cashbox.amount, 800);
    });
    it('should keep the current amount if the value of payment is negative', function() {
      cashbox.addPayment(-100);
      assert.deepEqual(cashbox.amount, 800);
    });
  });
  describe('refundPayment', function() {
    it('should add refund operation to the history', function() {
      cashbox.refundPayment(100);
      assert.deepEqual(cashbox.history, ['cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'payment added 100()', 'payment added 100(bills)', 'payment added 500()', 'payment added 100()', 'payment refunded 100()']);
    });
    it('should subtract the refund value from amount', function() {
      cashbox.refundPayment(100);
      assert.deepEqual(cashbox.amount, 600);
      cashbox.refundPayment(0);
      assert.deepEqual(cashbox.amount, 600);
      cashbox.refundPayment(0);
      assert.deepEqual(cashbox.amount, 600);
      cashbox.refundPayment(undefined);
      assert.deepEqual(cashbox.amount, 600);
      cashbox.refundPayment(NaN);
      assert.deepEqual(cashbox.amount, 600);
      cashbox.refundPayment('100');
      assert.deepEqual(cashbox.amount, 600);
      cashbox.refundPayment(Object);
      assert.deepEqual(cashbox.amount, 600);
    });
    it('should keep the current amount if the value of refund is negative', function() {
      cashbox.refundPayment(-100);
      assert.deepEqual(cashbox.amount, 600);
    });
  });
});