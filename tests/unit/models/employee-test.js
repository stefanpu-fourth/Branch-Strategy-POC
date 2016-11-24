import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('employee', {
  // Specify the other units that are required for this test.
  needs: [
    'validator:presence',
    'validator:alphabetical',
    'validator:length',
    'validator:phone-number',
    'validator:format'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
