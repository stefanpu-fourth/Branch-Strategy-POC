import DS from 'ember-data';

var attr = DS.attr;

var PayslipLineItem = DS.Model.extend({
    netPay: attr('number'),
    grossPay: attr('number'),
    processingDate: attr('string')
});

PayslipLineItem.reopenClass({
  FIXTURES: [
    {
      id: 1,
      netPay: 1333.00,
      grossPay: 1164.00,
      processingDate: '1 May 2014'
    },
    {
      id: 2,
      netPay: 1333.00,
      grossPay: 1164.00,
      processingDate: '1 June 2014'
    },
    {
      id: 3,
      netPay: 1333.00,
      grossPay: 1164.00,
      processingDate: '1 July 2014'
    },
    {
      id: 4,
      netPay: 1375.00,
      grossPay: 1192.00,
      processingDate: '1 August 2014'
    },
    {
      id: 5,
      netPay: 1375.00,
      grossPay: 1192.00,
      processingDate: '1 September 2014'
    },
    {
      id: 6,
      netPay: 1375.00,
      grossPay: 1192.00,
      processingDate: '1 October 2014'
    },
    {
      id: 7,
      netPay: 1375.00,
      grossPay: 1192.00,
      processingDate: '1 November 2014'
    },
    {
      id: 8,
      netPay: 833.00,
      grossPay: 814.00,
      processingDate: '1 December 2014'
    },
    {
      id: 9,
      netPay: 1500.00,
      grossPay: 1277.00,
      processingDate: '1 January 2015'
    },
    {
      id: 10,
      netPay: 1500.00,
      grossPay: 1277.00,
      processingDate: '1 February 2015'
    },
    {
      id: 11,
      netPay: 1500.00,
      grossPay: 1277.00,
      processingDate: '1 March 2015'
    },
    {
      id: 12,
      netPay: 1583.00,
      grossPay: 1334.00,
      processingDate: '1 April 2015'
    }
  ]
});

export default PayslipLineItem;
