import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  amount: faker.finance.amount,
  category(i) { return i % 2 === 0 ? 'Payment' : 'Deduction'; },
  description: faker.finance.accountName,
  isGross(i) { return i % 2 === 0; },
  rate() {
    return parseFloat(faker.finance.amount);
  },
  units() { return 2; }
});
