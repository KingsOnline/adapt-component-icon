define([
  'coreJS/adapt'
], function(Adapt) {

  var ComponentIconView = Backbone.View.extend({

    _componentIcons: null,

    initialize: function() {
      var model = this.model;
      console.log(this.model.findDescendants('components'));
      this._componentIcons = this.model.findDescendants('components').filter(function(models) {
        return models.get("_componentIcon");
      });
      if (this._componentIcons.length == 0) {
        return;
      }
      this._articleModelsIndexed = _.indexBy(this._articleModels, "_id");

      this.listenTo(Adapt, "pageView:ready", this.onPageReady);

      //Is this the best way to swap out graphics - maybe best to add both graphics on load and then toggle classes on device:changed, device:resize?
      this.listenTo(Adapt, 'device:changed', this.onPageReady);
      this.listenTo(Adapt, 'device:resize', this.onPageReady);
    },

    onPageReady: function() {
      this.$articleElements = {};
      this.callbacks = {};
      console.log(this._componentIcons);
      for (var i = 0, l = this._componentIcons.length; i < l; i++) {
        var componentModel = this._componentIcons[i];
        if (!componentModel.get('_componentIcon')) continue;
        if (componentModel.get('_componentIcon').src !== "") {
          var id = componentModel.get("_id");
          console.log(id);

          var $componentElement = this.$el.find("." + id);

          this.applyImage($componentElement, componentModel.get('_componentIcon').src);
        }
      }
    },

    applyImage: function($el, src) {
      console.log($($el).find('.component-header'));
      $($el).find('.component-header').prepend("<div class='component-icon-holder'><img class='component-icon' src='"+ src + "'/></div>");
    }
  });

  Adapt.on("pageView:postRender", function(view) {
    var model = view.model;
    console.log(model.findDescendants('components'));
    console.log(model);
      new ComponentIconView({
        model: model,
        el: view.el
      });
  });

});
