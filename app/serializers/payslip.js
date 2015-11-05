import SirenSerializer from './ess';

export default SirenSerializer.extend({
  deriveIncludeKey(relationshipMeta /*, sirenRelName*/) {
    return relationshipMeta.key;
  }
});
