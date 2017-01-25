import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:conditional-presence', 'Unit | Validator | conditional-presence', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
