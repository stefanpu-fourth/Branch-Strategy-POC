import assign from 'lodash/object/assign';

export default function() {

  this.get('/userEndPoint', function () {
    return {};
  });

  this.get('/api/', function (schema) {
    return schema.root.all()[0];
  });

  this.get('/api/employees/:id');

  this.get('/api/employees/:id/holidaybalance', function (schema, request) {
    const { id } = request.params;

    return schema.holidayBalance.where({ employee_id: id })[0];
  });

  this.get('/api/employees/:id/mainemployment', function (schema, request) {
    const { id } = request.params;

    return schema.mainEmployment.where({ employee_id: id })[0];
  });

  this.get('/api/employees/:id/payslips', function (schema, request) {
    const { id } = request.params;
    const payslips = schema.payslip.where({ employee_id: id });

    return payslips;
  });

  this.get('/api/employees/:id/rotaschedules', function (schema, request) {
    const { id } = request.params;

    return schema.rotaSchedule.where({ employee_id: id });
  });
}
