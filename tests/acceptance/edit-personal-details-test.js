import { test } from 'qunit';
import moduleForAcceptance from 'ess/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | edit personal details');

test('visiting /edit-personal-details', function(assert) {
  visit('/edit-personal-details');

  andThen(function() {
    assert.equal(currentURL(), '/edit-personal-details');
  });
});
