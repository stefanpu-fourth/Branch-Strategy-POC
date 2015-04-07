export default function () {

  this.transition(
    this.fromRoute('rotas'),
    this.toRoute('payslips'),
    this.use('toDown'),
    this.reverse('toUp')
  );

  this.transition(
    this.fromRoute('payslips'),
    this.toRoute('details'),
    this.use('toDown'),
    this.reverse('toUp')
  );

  this.transition(
    this.fromRoute('details'),
    this.toRoute('rotas'),
    this.use('toUp'),
    this.reverse('toDown')
  );

}
