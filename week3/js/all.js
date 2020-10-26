// 有參考範例程式碼
new Vue({
  el:'#app',
  data:{
    products:[
      { 
        id: 20190726,
        unit: '片',
        category: 'NS遊戲', //商品分類
        title: '聖火降魔錄風花雪月', // 商品名稱
        origin_price: 1780, // 原價
        price: 1560, // 售價      
        description:'女狼師攻略女學生', // 商品說明
        content: '戰棋加搞姬', // 商品敘述
        is_enabled: 1, // 是否上架， 1 為 true 0 為 false
        imageUrl: 'https://images.unsplash.com/photo-1560748718-0d8e822c257e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80', // 商品圖片
      },
      {
        id: 20191115,
        unit: '片',
        category: 'NS遊戲', 
        title: '精靈寶可夢劍', 
        origin_price: 1800,
        price: 1520,
        description:'人物比寶可夢更迷人',
        content: '逛街對戰廚CP',
        is_enabled: 0,
        imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        
      },
      {
        id: 20200320,
        unit: '片',
        category: 'NS遊戲', 
        title: '集合啦！動物森友會', 
        origin_price: 1700,
        price: 1600,
        description:'島的設計就想了 100 小時',
        content: '帥哥美女撿樹枝',
        is_enabled: 1,
        imageUrl: 'https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        
      },
    ],
    tempProduct: {}, // 暫存
  },
  methods:{ 
    // 看畫面有哪些功能： 新增、編輯、刪除。
    /* 新增和編輯寫在一起是由於兩者的 modal 展開後長的一樣，只是編輯是把內容放上去
    判斷的方式是看有無此 id 存在。 如果存在的話就做編輯動作；如否，則給它時間戳記作為 id*/
    updateProduct() {
      if (this.tempProduct.id) { 
        const id = this.tempProduct.id;
        this.products.forEach((item, i) => {
          if (item.id === id) {
            this.products[i] = this.tempProduct;
          }
        });
      } else {
        const id = new Date().getTime();
        this.tempProduct.id = id;
        this.products.push(this.tempProduct);
      }
      this.tempProduct = {}; // 清空暫存
      $('#productModal').modal('hide');
    },
    openModal(isNew, item) { // 依據點擊的按鈕選擇展開的互動視窗要執行哪個動作
      switch (isNew) {
        case 'new':
          this.tempProduct = {};
          $('#productModal').modal('show');
          break;
        case 'edit': // 如果是要編輯的話，淺層複製目標資料 (避免直接雙向綁定)，便於修改。
          this.tempProduct = Object.assign({}, item);
          $('#productModal').modal('show');
          break;
        case 'delete':
          $('#delProductModal').modal('show');
          this.tempProduct = Object.assign({}, item); // 指定的項目淺層則複製到暫存區 (把產品名稱顯示在畫面上用)
          break;
        default:
          break;
      }
    },
    delProduct() {
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        this.products.forEach((item, i) => {
          if (item.id === id) {
            this.products.splice(i, 1); // 從指定的索引刪除一個
            this.tempProduct= {};
          }
        });
      }
      $('#delProductModal').modal('hide');
    },
  },
}) ;