define([
  'coreJS/adapt'
], function(Adapt) {

  var ComponentIconView = Backbone.View.extend({

    _componentIcons: null,

    initialize: function() {
      var model = this.model;
      this._componentIcons = this.model.findDescendants('components').filter(function(models) {
        return models.get("_componentIcon");
      });

      this.listenTo(Adapt, "pageView:ready", this.onPageReady);
    },

    onPageReady: function() {
      _.each(this._componentIcons, function(componentModel) {
        var $el = this.$el.find("." + componentModel.get("_id"));
        if (componentModel.get('_componentIcon')._iconName) {
          this.applyImage($el, componentModel.get('_componentIcon'), "componentIcon-html");
        } else if (componentModel.get('_componentIcon').src) {
          this.applyImage($el, componentModel.get('_componentIcon'), "componentIcon-image");
        }
      }, this);
    },

    applyImage: function($el, componentIcon, type) {
      var template = Handlebars.templates[type];
      $($el).find('.component-header').prepend(template(componentIcon));
    }
  });

  Adapt.on("pageView:postRender", function(view) {
    var model = view.model;
    new ComponentIconView({
      model: model,
      el: view.el
    });
  });

});
