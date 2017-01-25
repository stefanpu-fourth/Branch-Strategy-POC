import {
  module
} from 'qunit';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

export default function (name, options = {}) {
  module(name, {
    beforeEach() {
      // To set pre-init conditions such as user configs before application create
      if (options.preInitialize) {
        options.preInitialize.apply(this, arguments);
      }
      console.log('in main');

      window.ga=sinon.spy();

      this.application = startApp();

      if (options.beforeEach) {
        options.beforeEach.apply(this, arguments);
      }
    },

    afterEach() {
      destroyApp(this.application);

      if (options.afterEach) {
        options.afterEach.apply(this, arguments);
      }
    }
  });
}
