import EssAdapter from './ess';

export default EssAdapter.extend({

    findQuery(store, type, query) {
        return this.ajax(this.buildODataUrl(type, query), 'GET');
    },

    buildODataUrl(type, query) {
        return this.getODataUrlParts(type, query)
            .reduce((url, segment, i) => {
                return (segment.length) ? url + this.getSlash(i) + segment : url;
            }, '');
    },

    getSlash(i) {
        return (i === 1) ? '/' : '';
    },

    getODataUrlParts(/* type, query */) {
        throw new Error("getODataUrlParts must be implemented by the target adapter");
    }

});
