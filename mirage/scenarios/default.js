export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('post', 10);

  const employee = server.create('employee');
  const payslips = server.createList('payslip', 10);

  server.create('root', { employeeId: employee.id });
  server.create('mainEmployment', { employeeId: employee.id });
  server.create('holidayBalance');
  server.createList('rotaSchedule', 10);
  payslips.map(ps => server.createList('payslipElement', 10, { payslip_id: ps.id }));
}
