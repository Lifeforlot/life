$(document).ready(function(){

  $('.mainCheck').on('change', function() {
        $('.check').prop('checked', this.checked);

        if (  this.checked )
          $('.delAll').addClass('show');
        else
          $('.delAll').removeClass('show');
  });

  window.App = {
            Models      : {},
            Collections : {},
            Views       : {}
  };

/*-----Shablon--------*/
  window.template = function(id){return _.template( $('#'+id).html() );};
/*--------------------------*/

  App.Models.Task = Backbone.Model.extend({

        EMPTY: "...",

        initialize: function() {
          if (!this.get("name")) {
            this.set({"name": this.EMPTY});
          }
        },


        default: {
            'title' : 'no title..',
            'name'  : 'no name', //content
            "done"  : false
          },

        toggle: function() {
          this.save({done: !this.get("done") });
        }
  });

  App.Collections.Task = Backbone.Collection.extend({

          model: App.Models.Task,
          localStorage: new Store("todos-backbone")/// сохранить всe элементы сюда
  });

  App.Views.AddTask = Backbone.View.extend({

          el: '#addTask',

          events:{
            'submit'          : 'submit',
            'click .delDone'  : 'delDone',
            'click .mainCheck': 'checkAll'
          },

          submit: function (e){
            // отменить действие по умолчанию
            e.preventDefault();

            var NewTaskTitle = $(e.currentTarget).find('#new-todo').val();
              if ( !$.trim(NewTaskTitle) ) return;

            var NewTask = new App.Models.Task ({title: NewTaskTitle, done: false});

            this.collection.add(NewTask);
            NewTask.save();                                             ///save
            $('#new-todo').val('');
          },

          delDone: function(){
             this.collection.remove( this.collection.where({done: true}) );
          },

          checkAll: function(){
            var noDone = this.collection.where({done: false});
            _.each(noDone, function(model) { model.toggle(); })
          }
  });

  App.Views.Task = Backbone.View.extend({

          tagName: 'li',

          template: template ('taskTemplate'),

          initialize: function(){
            this.model.on('destroy',this.remove,this);
            this.model.on('remove',this.destroy,this);
          },

          render: function (){
            var template = this.template(this.model.toJSON());
            this.$el.html( template );
            return this;
          },

          events: {
            'keypress .edit'        : 'createTitleEnter',
            'keypress .editCont'    : 'createContEnter',
            'dblclick .todo-title'  : 'editTitleOn',
            'dblclick .todo-content': 'editContOn',
            'click .okTitle'        : 'createTitle',
            'click .okCont'         : 'createCont',
            'click .delete'         : 'destroy',
            'click .check'          : 'toggleState'
          },

          editTitleOn: function(){
            this.$('.edit').addClass('show');
            this.$('.okTitle').addClass('show');
            this.$('.todo-title').addClass('hide');

            var editTitle =  this.model.get('title');
            this.$('.edit').val(editTitle);
            this.model.set('title', editTitle);
          },

          editContOn: function(){
            this.$('.editCont').addClass('show');
            this.$('.okCont').addClass('show');
            this.$('.todo-content').addClass('hide');

            var editCont =  this.model.get('name');
            this.$('.editCont').val(editCont);
            this.model.set('name', editCont);
          },

          createTitleEnter: function(e) {
            if (e.keyCode != 13) return;
            this.editTitleOff();
          },

          createContEnter: function(e) {
            if (e.keyCode != 13) return;
            this.editContOff();
          },

          createTitle: function() {
            this.editTitleOff();
          },

          createCont: function() {
            this.editContOff();
          },

          editTitleOff: function(){
            var title = this.$('.edit').val();
            if (!title) {
              this.model.save({title: 'no title..'});
            }
            else {
              this.model.save({title: title});
              $('.edit').removeClass('show');
              $('.todo-title').removeClass('hide');
            }
            this.render();
          },

          editContOff: function(){
            var cont = this.$('.editCont').val();
            if (!cont) {
              this.model.save({name: '...'});
            }
            else {
              this.model.save({name: cont});
              $('.editCont').removeClass('show');
              $('.todo-content').removeClass('hide');
            }
            this.render();
          },

          destroy: function(){
            this.model.destroy();
            tasksView.changeStat();
          },

          remove: function(){
            this.$el.remove();
          },

          toggleState: function() {
            this.model.toggle();
          }
  });

  App.Views.Tasks = Backbone.View.extend({

          tagName: 'ul',

          template: template('statTemplate'),

          initialize:function(){
            _.bindAll(this, 'addOne', 'render', 'changeStat');

            this.collection.fetch();                               ///fetch
            this.collection.on('add', this.addOne, this);
            this.collection.on('change', this.changeStat, this);
          },

          render: function(){
            this.collection.each( this.addOne, this );
            this.changeStat();
            return this;
          },

          changeStat:function(){
            var doneTrue = tasksCollection.where({done: true});
            $('#todo-stats').html(this.template({
              total:      tasksCollection.length,
              done:       doneTrue.length,
              remaining:  (tasksCollection.length - doneTrue.length)
            }));
          },

          addOne: function( task ){
            var taskView = new  App.Views.Task({model: task});
            this.$el.append( taskView.render().el );
          }
  });

/*------------------------------------------------------------------------------*/
  //глобальная коллекция
  var tasksCollection = new App.Collections.Task();
  var addTask = new App.Views.AddTask ({collection: tasksCollection });
  var tasksView = new  App.Views.Tasks({collection: tasksCollection});

  $('#list').html(tasksView.render().el);
  var doneTrue = tasksCollection.where({done: true});
});