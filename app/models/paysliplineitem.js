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
      netPay: 1500.00,
      grossPay: 1277.00,
    },
    {
      id: 2,
      netPay: 1500.00,
      grossPay: 1277.00,
    },
    {
      id: 3,
      netPay: 1500.00,
      grossPay: 1277.00,
    },
    {
      id: 4,
      netPay: 1500.00,
      grossPay: 1277.00,
    },
    {
      id: 5,
      netPay: 1500.00,
      grossPay: 1277.00,
    },
    {
      id: 6,
      netPay: 1500.00,
      grossPay: 1277.00,
    },
    {
      id: 7,
      netPay: 1500.00,
      grossPay: 1277.00,
    },
    {
      id: 8,
      netPay: 1500.00,
      grossPay: 1277.00,
    },
    {
      id: 9,
      netPay: 1500.00,
      grossPay: 1277.00,
    },
    {
      id: 10,
      netPay: 1500.00,
      grossPay: 1277.00,
    },
    {
      id: 11,
      netPay: 1500.00,
      grossPay: 1277.00,
    },
    {
      id: 1,
      netPay: 1500.00,
      grossPay: 1277.00,
    }
  ]
});

export default PayslipLineItem;
