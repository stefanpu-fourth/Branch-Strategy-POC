import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:alphabetical', 'Unit | Validator | alphabetical', {
  needs: [
    'validator:messages',
    'validator:presence'
  ]
});

const testMessage = 'Test Message.';
const correctValue_1 = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ';
const correctValue_2 = 'string-string ';
const correctValue_3 = 'string-string-string';
const correctValue_4 = 'string\'string';
const incorrectValue_1 = '1234567890';
const incorrectValue_2 = '§±!@#$%^&*()_=+[{}];:"|\\,<.>/?`~';
const incorrectValue_3 = '';
const incorrectValue_4 = NaN;
const incorrectValue_5 = null;
const incorrectValue_6 = '-string';
const incorrectValue_7 = '--string';
const incorrectValue_8 = 'string-';
const incorrectValue_9 = 'string--';
const incorrectValue_10 = '\'string';
const incorrectValue_11 = '\'\'string';
const incorrectValue_12 = 'string\'';
const incorrectValue_13 = 'string\'\'';


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

  assert.expect(17);

  assert.equal(validator.validate(correctValue_1, options), true,
    'Returned value should be "true" since the value contains only letters.');
  assert.equal(validator.validate(correctValue_2, options), true,
    'Returned value should be "true" since the value contains only letters and one dash in middle.');
  assert.equal(validator.validate(correctValue_3, options), true,
    'Returned value should be "true" since the value contains only letters and two dashes in middle.');
  assert.equal(validator.validate(correctValue_4, options), true,
    'Returned value should be "true" since the value contains only letters and one apostrophe in middle.');
  assert.equal(validator.validate(incorrectValue_1, options), testMessage,
    'Returned value should be a message since the value contains only digits.');
  assert.equal(validator.validate(incorrectValue_2, options), testMessage,
    'Returned value should be a message since the value contains only punctuation and symbols.');
  assert.equal(validator.validate(incorrectValue_3, options), false,
    'Returned value should be false since the value is an empty string and options property "allowBlank" is set to "false".');
  assert.equal(validator.validate(incorrectValue_4, options), false,
    'Returned value should be false since the value is "NaN" and options property "allowBlank" is set to "false".');
  assert.equal(validator.validate(incorrectValue_5, options), false,
    'Returned value should be false since the value is "null" and options property "allowBlank" is set to "false".');
  assert.equal(validator.validate(incorrectValue_6, options), testMessage,
    'Returned value should be message since the value is begining with dash.');
  assert.equal(validator.validate(incorrectValue_7, options), testMessage,
    'Returned value should be message since the value is begining with two dashes.');
  assert.equal(validator.validate(incorrectValue_8, options), testMessage,
    'Returned value should be message since the value is ending with dash.');
  assert.equal(validator.validate(incorrectValue_9, options), testMessage,
    'Returned value should be message since the value is ending with two dashes.');
  assert.equal(validator.validate(incorrectValue_10, options), testMessage,
    'Returned value should be message since the value is begining with apostrophe.');
  assert.equal(validator.validate(incorrectValue_11, options), testMessage,
    'Returned value should be message since the value is begining with two apostrophes.');
  assert.equal(validator.validate(incorrectValue_12, options), testMessage,
    'Returned value should be message since the value is ending with apostrophe.');
  assert.equal(validator.validate(incorrectValue_13, options), testMessage,
    'Returned value should be message since the value is ending with two apostrophes.');
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
