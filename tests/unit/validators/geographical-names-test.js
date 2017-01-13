import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:geographical-names', 'Unit | Validator | geographical-names', {
  needs: ['validator:messages']
});

const testMessage = 'Test Message.';
const correctValue_1 = 'abcdefghijklmnopqrstuwxyz ABCDEFGHIJKLMNOPQRSTUWXYZ';
const correctValue_2 = 'abcdefghijklmnopqrstuwxyz-ABCDEFGHIJKLMNOPQRSTUWXYZ';
const correctValue_3 = 'abcdefghijklmnopqrstuwxyz\'ABCDEFGHIJKLMNOPQRSTUWXYZ';
const incorrectValue_1 = '1234567890';
const incorrectValue_2 = '§±!@#$%^&*()_=+[{}];:"|\\,<.>/?`~';
const incorrectValue_3 = '';
const incorrectValue_4 = NaN;
const incorrectValue_5 = null;

test('it works', function (assert) {
  const validator = this.subject();

  assert.expect(1);

  assert.ok(validator);
});

test('Regular expression works with different string values', function (assert) {
  const options = ({
    message: testMessage,
    allowBlank: false
  });
  const validator = this.subject({
    options: options,
    value: incorrectValue_1
  });

  assert.expect(8);

  assert.equal(validator.validate(correctValue_1, options), true,
    'Returned value should be "true" since the value contains only supported characters.');
  assert.equal(validator.validate(correctValue_2, options), true,
    'Returned value should be "true" since the value contains only supported characters.');
  assert.equal(validator.validate(correctValue_3, options), true,
    'Returned value should be "true" since the value contains only supported characters.');
  assert.equal(validator.validate(incorrectValue_1, options), testMessage,
    'Returned value should be a message since the value contains digits.');
  assert.equal(validator.validate(incorrectValue_2, options), testMessage,
    'Returned value should be a message since the value contains unsupported characters.');
  assert.equal(validator.validate(incorrectValue_3, options), false,
    'Returned value should be false since the value is an empty string and options property "allowBlank" is set to "false".');
  assert.equal(validator.validate(incorrectValue_4, options), false,
    'Returned value should be false since the value is "NaN" and options property "allowBlank" is set to "false".');
  assert.equal(validator.validate(incorrectValue_5, options), false,
    'Returned value should be false since the value is "null" and options property "allowBlank" is set to "false".');
});

test('Validator allows empty values', function (assert) {
  const options = ({
    message: testMessage,
    allowBlank: true
  });
  const validator = this.subject({
    options: options,
    value: incorrectValue_1
  });

  assert.expect(3);

  assert.equal(validator.validate(incorrectValue_3, options), true,
    'Returned value should be "true" since the value is an empty string and options property "allowBlank" is set to "true".');
  assert.equal(validator.validate(incorrectValue_4, options), true,
    'Returned value should be "true" since the value is "NaN" and options property "allowBlank" is set to "true".');
  assert.equal(validator.validate(incorrectValue_5, options), true,
    'Returned value should be "true" since the value is "null" and options property "allowBlank" is set to "true".');
});
