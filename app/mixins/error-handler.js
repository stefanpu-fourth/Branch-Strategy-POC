import Ember from 'ember';

export default Ember.Mixin.create({

  actions: {
    error(error, transition) {
      let message = 'How embarrassing!! We could not do what you asked and we do not know why. Please try again.';
      if (error && error.status==='403') {
        message = 'Sorry but you do not have permissions to see ' + transition.targetName;
      }
      this.notifications.addNotification({
        message,
        type: 'error',
        autoClear: true,
        clearDuration: 3000
      });

      return transition.abort();
    }
  }
});
