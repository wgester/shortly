window.Shortly = Backbone.View.extend({

  template: _.template(' \
      <h1>Shortly</h1> \
      <input type="text" id="filter" placeholder ="Filter By:"></input> \
      <button id="filterButton">Filter</button> \
      <button id="resetButton">Reset</button> \
      <div class="navigation"> \
      <ul> \
        <li><a href="#" class="index">All Links</a></li> \
        <li><a href="#" class="create">Shorten</a></li> \
      </ul> \
      </div> \
      <div id="container"></div>'
  ),

  events: {
    "click li a.index":  "renderIndexView",
    "click li a.create": "renderCreateView",
    "click #filterButton": "filter",
    "click #resetButton": "renderIndexView"
  },

  initialize: function(){
    console.log( "Shortly is running" );
    $('body').append(this.render().el);
    this.renderIndexView(); // default view
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  renderIndexView: function(e){
    e && e.preventDefault();
    var links = new Shortly.Links();
    var linksView = new Shortly.LinksView( {collection: links} );
    this.$el.find('#container').html( linksView.render().el );
    this.updateNav('index');
  },

  renderCreateView: function(e){
    e && e.preventDefault();
    var linkCreateView = new Shortly.LinkCreateView();
    this.$el.find('#container').html( linkCreateView.render().el );
    this.updateNav('create');
  },

  updateNav: function(className){
    this.$el.find('.navigation li a')
            .removeClass('selected')
            .filter('.'+className)
            .addClass('selected');
  },

  filter: function(){
    var filter = $('#filter').val();
    var deleteArray = [];
    for (var i = 0; i < $('.original').length; i++){
      if (($('.original')[i].innerHTML).indexOf(filter) === -1){
        deleteArray.unshift(i);
      } 
    }
    for (var i = 0; i < deleteArray.length; i++){
      $('.link')[deleteArray[i]].remove();
    }
    $('#filter').val("");
  }

});