import Ember from 'ember';
import ErrorHandlerMixin from '../../../mixins/error-handler';
import { module, test } from 'qunit';

let subject;
let stub;

module('Unit | Mixin | error handler', {
  beforeEach() {
    const ErrorHandlerObject = Ember.Object.extend(ErrorHandlerMixin);

    subject = ErrorHandlerObject.create();
    subject.actions.notifications =  { addNotification: sinon.spy() };
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  assert.ok(subject);
});

test('error handler transition', function(assert) {
  assert.expect(2);

  const transition = { abort: sinon.spy() };

  subject.actions.error({ status: '403' }, transition);

  // TODO: Test the content of the error but we don't know how it will be yet
  assert.ok(subject.actions.notifications.addNotification.calledOnce, 'fire addNotification');
  assert.ok(transition.abort.calledOnce, 'stop transition');
});
