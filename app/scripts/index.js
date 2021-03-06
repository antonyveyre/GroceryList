
var appCl = new Vue({
  el: '#itemapp',
  data: {
    counter: 0,
    items : [],
    shownItems : [],
    item: '',
    userId : ''
  },


  // on load
  mounted () {
    let name;
    function enterYourName(){
      name = prompt('enter your name')
      if (!name || !name.trim()){
        enterYourName();
      }
    };
    this.$http.get('/session?userName='+name).then(response => {
      if (response.body=='nameRequest')
      {
        enterYourName();
        this.$http.get('/session?userName='+name).then(response => {
          this.userId = name;
        },
        response => {
          console.error('error');
        });
      }
      this.items = response.body.items;
      this.shownItems = this.items;
      this.userId = response.body.name;
    }, response => {
      console.error('error !!!');
      // error callback
    });

    this.shownItems = this.items;

  },
// event methods
  methods: {
    itemAdd: function () {
      if (this.item=='')
      {
        alert ('item is empty');
        return;
      }
      if (this.items!==undefined)
      {
        if (this.items.indexOf(this.item)!=-1)
        {
          alert ('item already exists');
          console.error('item already exists');
          return;
        }
      }
      this.$http.get('/add?item='+this.item)
      .then(
        response =>
        {
          this.item ='';
          this.items = response.body;
          this.shownItems = this.items;
        }, response =>
        {
          console.error('error !!!');
          // error callback
        });
      },

      itemDell: function(index){
        console.log(index);
        // this.$delete(this.items, index);
        this.$http.get('/delItem?title='+index).then(
          response => {
            this.items = response.body;
            this.shownItems = this.items;

          },responseOnError => {
            alert('error on delete')
          })
        },

        itemChng: function(title)
        {
          this.$http.get('/chngItem?title='+title).then(
            response => {
              this.items = response.body;
            }, responseOnError =>
            {
              alert('error on change')
            })
          },

          deconnect: function (){
            this.$http.get('/logoff').then(
              response => {
                if (response.body == 'logout')
                {
                  alert('session deleted');
                  document.querySelector('html').innerHTML='';
                }
              },responseOnError => {
                alert('error deconnection')
                console.error(responseOnError);
              })
            },

            showAll: function(){
              this.shownItems = this.items;
            },

            showDone: function(){
              this.shownItems = this.items.filter(function(item){
                return item.checked;
              });
            },

            showUndone: function(){
              this.shownItems = this.items.filter(function(item){
                return !item.checked;
              });
            }
          }
        });
