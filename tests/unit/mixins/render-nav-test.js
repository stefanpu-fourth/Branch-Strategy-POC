import Ember from 'ember';
import RenderNavMixin from '../../../mixins/render-nav';
import { module, test } from 'qunit';

const RenderNavMixinObject = Ember.Object.extend(RenderNavMixin);
let subject;

module('Unit | Mixin | render nav', {
  beforeEach() {
    subject = RenderNavMixinObject.create({
      render: sinon.spy()
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  assert.ok(subject);
});

test('renderTemplate calls render twice with correct arguments', function(assert) {
  assert.expect(3);

  const renderOptions = {
    into: 'application',
    outlet: 'nav',
    controller: 'application'
  };

  subject.renderTemplate();

  assert.ok(subject.render.calledTwice, 'Render is called twice');
  assert.equal(subject.render.getCall(0).args.length, 0, 'First call did not have any arguments supplied');
  assert.deepEqual(subject.render.getCall(1).args, ['application/nav', renderOptions], 'Second call arguments supplied path and renderOptions');
});
