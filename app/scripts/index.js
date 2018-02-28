var appCl = new Vue({
  el: '#itemList',
  data: {
    counter: 0,
    items : [],
    item: '',
    userId : ''
  },
  // on load
  mounted () {
    this.$http.get('/session').then(response => {
      console.log(this);
      console.log(response.body);
      this.items = response.body;
      this.userId = response.session;
    }, response => {
      console.log('error !!!');
      // error callback
    });
  },

  methods: {

    itemAdd: function () {
      if (this.item==''){
        alert ('item is empty');
        return;
      }
      if (this.items.indexOf(this.item)!=-1)
      {
        alert ('item already exists');
        console.error('item already exists');
        return;
      }
      console.log(this.item);
      this.$http.get('/add?item='+this.item).then(response => {
        console.log(this);
        console.log(response.body);
        this.item ='';
        this.items = response.body;
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
          alert('item deleted');
          this.items = response.body;
        },responseOnError => {
          alert('error deconnection')
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
