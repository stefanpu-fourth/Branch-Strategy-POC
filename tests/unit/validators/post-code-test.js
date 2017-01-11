import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:post-code', 'Unit | Validator | post-code', {
  needs: ['validator:messages']
});

const testMessage = 'Test Message.';
const correctValue_1 = '01234abcdefghijklmnopqrstuwxyz56789ABCDEFGHIJKLMNOPQRSTUWXYZ';
const correctValue_2 = '01234abcdefghijklmnopqrstuwxyz-56789ABCDEFGHIJKLMNOPQRSTUWXYZ';
const correctValue_3 = '01234abcdefghijklmnopqrstuwxyz 56789ABCDEFGHIJKLMNOPQRSTUWXYZ';
const incorrectValue_1 = '-01234abcdefghijklmnopqrstuwxyz-56789ABCDEFGHIJKLMNOPQRSTUWXYZ-';
const incorrectValue_2 = ' 01234abcdefghijklmnopqrstuwxyz-56789ABCDEFGHIJKLMNOPQRSTUWXYZ';
const incorrectValue_3 = '§±!@#$%^&*()_=+[{}];:"|\\,<.>/?`~';
const incorrectValue_4 = '';
const incorrectValue_5 = NaN;
const incorrectValue_6 = null;

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

  assert.expect(9);

  assert.equal(validator.validate(correctValue_1, options), true,
    'Returned value should be "true" since the value contains only supported characters.');
  assert.equal(validator.validate(correctValue_2, options), true,
    'Returned value should be "true" since the value contains only supported characters.');
  assert.equal(validator.validate(correctValue_3, options), true,
    'Returned value should be "true" since the value contains only supported characters.');
  assert.equal(validator.validate(incorrectValue_1, options), testMessage,
    'Returned value should be a message since the value begins with dash.');
  assert.equal(validator.validate(incorrectValue_2, options), testMessage,
    'Returned value should be a message since the value begins with space.');
  assert.equal(validator.validate(incorrectValue_3, options), testMessage,
    'Returned value should be a message since the value contains unsupported characters.');
  assert.equal(validator.validate(incorrectValue_4, options), false,
    'Returned value should be false since the value is an empty string and options property "allowBlank" is set to "false".');
  assert.equal(validator.validate(incorrectValue_5, options), false,
    'Returned value should be false since the value is "NaN" and options property "allowBlank" is set to "false".');
  assert.equal(validator.validate(incorrectValue_6, options), false,
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

  assert.equal(validator.validate(incorrectValue_4, options), true,
    'Returned value should be "true" since the value is an empty string and options property "allowBlank" is set to "true".');
  assert.equal(validator.validate(incorrectValue_5, options), true,
    'Returned value should be "true" since the value is "NaN" and options property "allowBlank" is set to "true".');
  assert.equal(validator.validate(incorrectValue_6, options), true,
    'Returned value should be "true" since the value is "null" and options property "allowBlank" is set to "true".');
});
