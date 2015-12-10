import Serializer from 'ember-cli-mirage/serializers/json-api-serializer';
// import Collection from 'ember-cli-mirage/orm/collection';
import Model from 'ember-cli-mirage/orm/model';
import _assign from 'lodash/object/assign';
import { pluralize } from 'ember-cli-mirage/utils/inflector';

export default Serializer.extend({

  serialize(response) {
    let payload;

    if (response instanceof Model) {
      payload = this._serializePrimaryModel(response);
    } else {
      payload = this._serializePrimaryCollection(response);
    }

    return payload;
  },

  _serializePrimaryModel(model) {
    const response = this._resourceObjectFor(model);

    return response;
  },

  _serializePrimaryCollection(collection) {
    const response = {
      'class': this.keyForCollection(collection[0].type),
      properties: {},
      entities: collection.map(model => this._resourceObjectFor(model)),
      links: []
    };

    return response;
  },

  _resourceObjectFor(model) {
    const obj = {
      'class': this.keyForModel(model.type),
      properties: this._attrsForModel(model),
      entities: [],
      links: []
    };

    return obj;
  },

  _attrsForModel(model) {
    let attrs = {};

    if (this.attrs) {
      attrs = this.attrs.reduce((memo, attr) => {
        memo[attr] = model[attr];
        return memo;
      }, {});
    } else {
      attrs = _assign(attrs, model.attrs);
    }

    model.fks.forEach(fk => {
      delete attrs[fk];
    });

    return attrs;
  },

  keyForModel(type) {
    return [ type ];
  },

  keyForCollection(type) {
    return [ 'Paged-Collection', type ];
  },

  keyForAttribute(attr) {
    return attr;
  }

  /*keyForRelationship(type) {
    return [ 'Paged-Collection', pluralize(type) ];
  },*/

  /*normalize(payload) {
    console.log(payload);
    debugger;
    let type = Object.keys(payload)[0];
    let attrs = payload[type];

    let jsonApiPayload = {
      data: {
        type: pluralize(type),
        attributes: {}
      }
    };

    if (attrs.id) {
      jsonApiPayload.data.id = attrs.id;
    }

    Object.keys(attrs).forEach(key => {
      if (key !== 'id') {
        jsonApiPayload.data.attributes[dasherize(key)] = attrs[key];
      }
    });

    console.log(jsonApiPayload);

    return jsonApiPayload;
  }*/

});
