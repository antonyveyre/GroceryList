
var appCl = new Vue({
  el: '#itemapp',
  data: {
    counter: 0,
    items : [],
    item: '',
    userId : ''
  },
  // on load
  mounted () {
    console.log(this.items);
    let name;
    function enterYourName(){
      name = prompt('enter your name')
      if (!name || !name.trim()){
        enterYourName();
      }
    };
    this.$http.get('/session?userName='+name).then(response => {
      console.log(this);
      console.log(response.body);
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
      console.log(response.body);
      this.items = response.body.items;
      this.userId = response.body.name;
    }, response => {
      console.log('error !!!');
      // error callback
    });
  },

  methods: {

    itemAdd: function () {
      console.log(this.items);
      if (this.item==''){
        alert ('item is empty');
        return;
      }
      if (this.items!==undefined)
      {
        if (this.items.indexOf(this.item)!=-1)
        {
          alert ('item already exists');
          console.error('item already exists');
          return;}
        }
        this.$http.get('/add?item='+this.item).then(response => {
          console.log(this);
          console.log(response.body.items);
          this.item ='';
          this.items = response.body.items;
        }, response => {
          console.error('error !!!');
          // error callback
        });

      },

      itemDell: function(index){
        console.log(index);
        // this.$delete(this.items, index);
        this.$http.get('/delItem?index='+index).then(
          response => {
            this.items = response.body;
          },responseOnError => {
            alert('error on delete')
          })
        },

        deconnect: function (){
          this.$http.get('/session').then(
            response => {
              alert('session deleted');
            },responseOnError => {
              alert('error deconnection')
            })
          }
        }
      });
