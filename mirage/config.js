import assign from 'lodash/object/assign';

export default function () {
  this.get('/userEndPoint', function () {
    return {};
  });

  this.get('https://fourth-branding.azurewebsites.net/:company/brand.json', function (schema, request) {
    return {
      "name": request.params.company,
      "brandColor": "#c7155b"
    };
  });

  this.namespace = '/api';
  

  this.get('/', function (schema, request) {
    console.log(schema.root.all()[0]);
    return schema.root.all()[0];
  });

  this.get('/user', function (schema) {
    console.log(schema.root.all()[0]);
    return schema.root.all()[0];
  });

  this.get('/employees/:id', function (schema, request) {
    const { id } = request.params;

    return schema.employee.where({ employeeId: id })[0];
  });

  this.get('/employees/:id/holidaybalance', function (schema, request) {
    const { id } = request.params;

    return schema.holidayBalance.where({ employeeId: id })[0];
  });

  this.get('/employees/:id/mainemployment', function (schema, request) {
    const { id } = request.params;

    return schema.mainEmployment.where({ employeeId: id })[0];
  });

  this.get('/employees/:id/payslips', function (schema, request) {
    const { id } = request.params;
    const payslips = schema.payslip.where({ employeeId: id });

    return payslips;
  });

  this.get('/employees/:id/rotaschedules', function (schema, request) {
    const { id } = request.params;

    return schema.rotaSchedule.where({ employeeId: id });
  });

  this.put('/employees/:id', function (schema, request) {
    const changedEmployee = JSON.parse(request.requestBody);
    const { id } = request.params;
    let employee = schema.employee.where({ employeeId: id })[0];

    return employee.update(changedEmployee);
  });
}
