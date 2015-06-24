import SirenSerializer from './ess';

export default SirenSerializer.extend({
  normalizeArrayResponse(store, primaryModelClass, payload) {
    payload.properties.id = payload.properties.employeeId;
    const normalized = this.normalizeSingleResponse(store, primaryModelClass, payload);
    return {
      data: [normalized.data]
    };
  }
});
