// 參考範例程式碼

var obj = {

    data:{
      uuid:'28ddc881-34aa-4322-95a0-a5ecbf863ad8',
      products: []
    },
    getData: function(){

      var vm = this;//物件下使用 this 直接在前面做定義較保險
      var url = `https://course-ec-api.hexschool.io/api/${this.data.uuid}/ec/products`; //取得「產品列表」
    //   console.log(url);
      axios.get(url)
        .then(function(response){
        vm.data.products = response.data.data;//取回資料傳入 vm.data.products
        vm.render();
      })    
    },
    render: function(){//印出資料
      var app = document.getElementById('app');
      var products = this.data.products; 
      var str = '';
      products.forEach(function(item){
        str += `
  <div class="card">
  <img src="${ item.imageUrl[0] }" class="card-img-top">      
  <div class="card-body">
  <h5 class="card-title">${ item.title }</h5>
  <p class="card-text">${ item.content }</p>
  <p class="card-text">原價：${ item.origin_price }</p>
  <h2>特價：${ item.price }<h2>

  </div>
  </div>`;
      })
      app.innerHTML = str;
    }
  }

  obj.getData();