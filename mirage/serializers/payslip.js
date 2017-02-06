import ApplicationSerializer from './application';

const PayslipSerializer = ApplicationSerializer.extend({
  relationships: ['payslipElements'],

  _buildRelPath() {
    const test = "test";
    console.log(test);
    return '/rels/payslipElement';
  }
});

PayslipSerializer.prototype.included = ['payslipElements'];

export default PayslipSerializer;
