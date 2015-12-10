export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('post', 10);

  const employee = server.create('employee');

  server.create('root', { employeeId: employee.id });
  server.create('mainEmployment', { employeeId: employee.id });
  server.create('holidayBalance');
  server.createList('rotaSchedule', 10);
  server.createList('payslip', 10);
  server.createList('payslipElement', 10);
}
