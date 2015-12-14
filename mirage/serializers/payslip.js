import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  relationships: ['payslipElements']
});
