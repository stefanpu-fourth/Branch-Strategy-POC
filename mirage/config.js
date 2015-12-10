export default function() {

  this.get('/userEndPoint', function () {
    return {};
  });

  this.get('/api', 'root');
  this.get('/api/employees/:id');
  this.get('/api/employees/:id/holidaybalance', 'holidayBalance');
  this.get('/api/employees/:id/mainemployment', 'mainEmployment');
  this.get('/api/employees/:employee_id/payslips', 'payslips', ['payslipElements']);
  this.get('/api/employees/:employee_id/rotaschedules', 'rotaSchedules');
}
