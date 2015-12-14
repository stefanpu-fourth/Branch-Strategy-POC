export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('post', 10);

  const employee = server.create('employee');
  const employee_id = employee.id;
  const payslips = server.createList('payslip', 10);

  server.create('root', { employee_id, employeeId: employee.id });
  server.create('mainEmployment', { employee_id, employeeId: employee.id });
  server.create('holidayBalance', { employee_id });
  server.createList('rotaSchedule', 10, { employee_id });
  payslips.map(ps => server.createList('payslipElement', 10, { payslip_id: ps.id }));
}
