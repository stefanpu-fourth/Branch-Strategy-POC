import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:phone-number', 'Unit | Validator | phone-number', {
  needs: [
    'validator:messages',
    'validator:presence'
  ]
});

const onlyDigitsErrorMessage = 'Only Digits Error Message';
const leadingZeroErrorMessage = 'Leading Zero Error Message';
const correctValue = '0123456789';
const incorrectValue_1 = '1234567890';
const incorrectValue_2 = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ';
const incorrectValue_3 = '§±!@#$%^&*()-_=+[{}];:"\'|\\,<.>/?`~';
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
    onlyDigitsErrorMessage: onlyDigitsErrorMessage,
    leadingZeroErrorMessage: leadingZeroErrorMessage,
    allowBlank: false
  });
  const validator = this.subject({
    options: options,
    value: incorrectValue_1
  });

  assert.expect(7);

  assert.equal(validator.validate(correctValue, options), true,
    'Returned value should be "true" since the value contains only digits.');
  assert.equal(validator.validate(incorrectValue_1, options), leadingZeroErrorMessage,
    'Returned value should be a "Only Digits Error Message" since the value contains only letters.');
  assert.equal(validator.validate(incorrectValue_2, options), onlyDigitsErrorMessage,
    'Returned value should be a "Only Digits Error Message" since the value contains only letters.');
  assert.equal(validator.validate(incorrectValue_3, options), onlyDigitsErrorMessage,
    'Returned value should be a "Only Digits Error Message" since the value contains only punctuation and symbols.');
  assert.equal(validator.validate(incorrectValue_4, options), false,
    'Returned value should be a "Only Digits Error Message" since the value is an empty string and options property "allowBlank" is set to "false".');
  assert.equal(validator.validate(incorrectValue_5, options), false,
    'Returned value should be a "Only Digits Error Message" since the value is "NaN" and options property "allowBlank" is set to "false".');
  assert.equal(validator.validate(incorrectValue_6, options), false,
    'Returned value should be a "Only Digits Error Message" since the value is "null" and options property "allowBlank" is set to "false".');
});

test('Validator allows empty values', function (assert) {
  const options = ({
    onlyDigitsErrorMessage: onlyDigitsErrorMessage,
    leadingZeroErrorMessage: leadingZeroErrorMessage,
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
