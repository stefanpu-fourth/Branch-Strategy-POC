import Ember from 'ember';

export default Ember.Mixin.create({
  getPaginationString(items, page) {
    if (isNaN(items) || isNaN(page)) {
      return '';
    }
    return `&$skip=${+items * (+page - 1)}&$top=${items}`;
  }
});
