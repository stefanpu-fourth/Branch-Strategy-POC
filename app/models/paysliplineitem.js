import DS from 'ember-data';

var attr = DS.attr;

var PayslipLineItem = DS.Model.extend({
  grossPay: attr('number'),
  netPay: attr('number'),
  processingDate: attr('string')
});

PayslipLineItem.reopenClass({
  FIXTURES: [{
    id: 1,
    grossPay: 1333.00,
    netPay: 1164.00,
    processingDate: '1 May 2014'
  }, {
    id: 2,
    grossPay: 1333.00,
    netPay: 1164.00,
    processingDate: '1 June 2014'
  }, {
    id: 3,
    grossPay: 1333.00,
    netPay: 1164.00,
    processingDate: '1 July 2014'
  }, {
    id: 4,
    grossPay: 1375.00,
    netPay: 1192.00,
    processingDate: '1 August 2014'
  }, {
    id: 5,
    grossPay: 1375.00,
    netPay: 1192.00,
    processingDate: '1 September 2014'
  }, {
    id: 6,
    grossPay: 1375.00,
    netPay: 1192.00,
    processingDate: '1 October 2014'
  }, {
    id: 7,
    grossPay: 1375.00,
    netPay: 1192.00,
    processingDate: '1 November 2014'
  }, {
    id: 8,
    grossPay: 833.00,
    netPay: 814.00,
    processingDate: '1 December 2014'
  }, {
    id: 9,
    grossPay: 1500.00,
    netPay: 1277.00,
    processingDate: '1 January 2015'
  }, {
    id: 10,
    grossPay: 1500.00,
    netPay: 1277.00,
    processingDate: '1 February 2015'
  }, {
    id: 11,
    grossPay: 1500.00,
    netPay: 1277.00,
    processingDate: '1 March 2015'
  }, {
    id: 12,
    grossPay: 1583.00,
    netPay: 1334.00,
    processingDate: '1 April 2015'
  }]
});

export default PayslipLineItem;
