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
      if (this._componentIcons.length == 0) {
        return;
      }

      this.listenTo(Adapt, "pageView:ready", this.onPageReady);
    },

    onPageReady: function() {
      for (var i = 0, l = this._componentIcons.length; i < l; i++) {
        var componentModel = this._componentIcons[i];
        if (componentModel.get('_componentIcon').src !== "") {
          var id = componentModel.get("_id");
          var $el = this.$el.find("." + id);
          this.applyImage($el, componentModel.get('_componentIcon'));
        }
      }
    },

    applyImage: function($el, componentIcon) {
      var template = Handlebars.templates.componentIcon;
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
