import ApplicationSerializer from './application';

const PayslipSerializer = ApplicationSerializer.extend({
  relationships: ['payslipElements'],

  _buildRelPath() {
    return '/rels/payslipElement';
  }
});

PayslipSerializer.prototype.included = ['payslipElements'];

export default PayslipSerializer;
