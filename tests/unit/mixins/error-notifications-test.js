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

test('error notifications transition call addNotification and abort the transition', function(assert) {
  assert.expect(2);

  const subject = ErrorNotificationsObject.create();
  const transition = { abort: sinon.spy() };

  subject.notifications.addNotification = sinon.spy();
  subject.actions.error.apply(subject, [{ status: '403' }, transition]);

  assert.ok(subject.notifications.addNotification.calledOnce, 'fire addNotification');
  assert.ok(transition.abort.calledOnce, 'stop transition');
});

test('_getErrorTranslationKey returns the tranlation key when it finds the key', function(assert) {
  assert.expect(1);

  const subject = ErrorNotificationsObject.create();

  subject._errorCodes = { '403': 'forbidden' };

  assert.equal(subject._getErrorTranslationKey({ status: '403' }), 'forbidden', '403 return forbidden translation');
});

test('_getErrorTranslationKey returns catchAll when the tranlation key is not found', function(assert) {
  assert.expect(1);

  const subject = ErrorNotificationsObject.create();

  subject._errorCodes = {};

  assert.equal(subject._getErrorTranslationKey({ status: '500' }), 'catchAll', 'Can not find the error');
});
