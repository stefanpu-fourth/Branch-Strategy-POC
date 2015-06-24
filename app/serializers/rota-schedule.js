import SirenSerializer from './ess';

export default SirenSerializer.extend({
  // TODO: this is spoofed, and not yet gathered from payload as it's not currently provided by the API
  extractMeta(store, type /*, payload*/ ) {
    store.setMetadataFor(type, {
      dayStartAsMinutes: 0,
      dayEndAsMinutes: 0
    });
  }
});
