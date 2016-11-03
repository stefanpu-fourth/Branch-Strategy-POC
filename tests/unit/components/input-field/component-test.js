import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('input-field', {
  needs: [
    'component:svg-icon',
    'template:partials/icons/x'
  ]
});

test('it renders', function (assert) {
  assert.expect(2);

  // Create the component instance
  const component = this.subject();
  assert.equal(component._state, 'preRender');

  // Render component
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('component properties are set', function (assert) {
  assert.expect(4);

  const component = this.subject({
    value: 'test string',
    type: 'text',
    placeholder: 'test placeholder',
    inputId: 'testId'
  });

  const inputElement = this.$('#testId');
  const actualValue = inputElement.val();
  const actualType = inputElement.attr('type');
  const actualId = inputElement.attr('id');
  const actualPlaceholder = this.$('label').text();

  assert.equal(actualValue, 'test string', 'Input element value should be set to "test string".');
  assert.equal(actualType, 'text', 'Input element type should be set to "text".');
  assert.equal(actualId, 'testId', 'Input element value should be set to "testId".');
  assert.equal(actualPlaceholder, 'test placeholder', 'Input element type should be set to "test placeholder".');
});

test('clear button resets the input value', function (assert) {
  assert.expect(2);

  // Creates the component
  const component = this.subject({
    value: 'test string',
    type: 'text',
    inputId: 'testId'
  });

  const clearButton = this.$('#clearButton');

  clearButton.click();

  const newInputValue = this.$('#testId').val();

  assert.equal(newInputValue, '', 'Input element value should be set to an empty string.');
  assert.equal(component.get('isFocused'), false, '"isFocused" should be set to false, since the value is set to an empty string.');

});

test('"focusIn" action triggers', function (assert) {
  assert.expect(2);

  const component = this.subject({
    value: '',
    type: 'text',
    inputId: 'testId'
  });
  const inputElement = this.$('#testId');

  assert.equal(component.get('isFocused'), false, '"isFocused" should be set to false, since the value is an empty string.');

  inputElement.focus();

  assert.equal(component.get('isFocused'), true, '"isFocused" should be set to true, since on the input element has been triggered a focus event.');
});

test('"focusOut" action triggers', function (assert) {
  assert.expect(4);

  const component = this.subject({
    value: 'test string',
    type: 'text',
    inputId: 'testId'
  });

  const inputElement = this.$('#testId');

  // Test if "isFocused" is true when an there is a value.
  assert.equal(component.get('isFocused'), true, '"isFocused" should be set to true, since there is a value.');

  // Test if "isFocused" is still true after "focusIn" and "focusOut" events.
  inputElement.focus();
  inputElement.focusout();
  assert.equal(component.get('isFocused'), true, '"isFocused" should be set to true, since there is a value.');

  // Test if "isFocused" is true after the value is set to an empty string and a "focusin" event is triggered on the element.
  inputElement.val('');

  inputElement.focus();
  assert.equal(component.get('isFocused'), true, '"isFocused" should be set to true, since the element is focused.');

  // Test if "isFocused" is false after value is set to an empty string and a "focusout" event is triggered.
  inputElement.focusout();
  assert.equal(component.get('isFocused'), false, '"isFocused" should be set to false, since the value is set to an empty string.');
});
