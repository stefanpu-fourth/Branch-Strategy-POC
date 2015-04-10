import DS from 'ember-data';

export default DS.FixtureAdapter.extend({
  // SJ: this is just to stop the fixture adapter
  // from complaining when I try and query in
  // the model hook.
  queryFixtures: function(fixture) {
    return fixture;
  }
});
