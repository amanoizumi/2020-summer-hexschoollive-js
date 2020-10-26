// 有參考範例程式碼

// all.js 使用 AJAX 取得外部資料
new Vue({
  el: '#app',
  data: { // 定義資料
    products: [],
    pagination: {}, // 分頁
    tempProduct: { // 商品暫存
      imageUrl: [], // 圖片網址有五張，是陣列
    },
    isNew: false, // 之後要用 if(!this.isNew) 來判斷編輯或新增商品的動作
    status: {
      fileUploading: false, // 
    },
    user: {
      token: '',
      uuid: '28ddc881-34aa-4322-95a0-a5ecbf863ad8', // 我的 uuid
    }, 
  },
  created() {
    // 先取得 token
    this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // 無法取得 token 則返回 Login 頁面
    if (this.user.token ==='') {
      window.location = 'Login.html';
    }
    this.getProducts(); // 成功後取得產品列表
  },

  methods: {
    // 屬得產品列表
    getProducts(page = 1) {
      const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`;
      // 預設帶入 token
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

       axios.get(api).then((response) => {
        this.products = response.data.data;
        this.pagination = response.data.meta.pagination;
      });
    },
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.$refs.productModal.tempProduct = {
            imageUrl: [],
          };
          this.isNew = true;
          $('#productModal').modal('show');
          break;
        case 'edit': // 如果是要編輯的話，淺層複製目標資料 (避免直接雙向綁定)，便於修改。
          this.tempProduct = Object.assign({}, item);
          
          // 使用 refs 觸發子元件方法
          // https://blog.johnsonlu.org/vue-refs/
          this.$refs.productModal.getProduct(this.tempProduct.id);
          this.isNew = false;
          break;
        case 'delete':
          this.tempProduct = Object.assign({}, item); // 指定的項目淺層則複製到暫存區 (把產品名稱顯示在畫面上用)
          $('#delProductModal').modal('show');     
          break;
        default:
          break;
      }
    },
  },
})