import Ember from 'ember';
import ErrorNotificationsMixin from '../../../mixins/error-notifications';
import { module, test } from 'qunit';

const ErrorNotificationsObject = Ember.Object.extend(ErrorNotificationsMixin, {
  notifications: {}
});

module('Unit | Mixin | error notifications');

// Replace this with your real tests.
test('it works', function(assert) {
  const subject = ErrorNotificationsObject.create();
  assert.ok(subject);
});

test('error notifications transition', function(assert) {
  assert.expect(2);

  const subject = ErrorNotificationsObject.create();
  const transition = { abort: sinon.spy() };

  subject.notifications.addNotification = sinon.spy();
  subject.actions.error.apply(subject, [{ status: '403' }, transition]);

  // TODO: Test the content of the error but we don't know how it will be yet
  assert.ok(subject.notifications.addNotification.calledOnce, 'fire addNotification');
  assert.ok(transition.abort.calledOnce, 'stop transition');
});
