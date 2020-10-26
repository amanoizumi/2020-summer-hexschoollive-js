// 有參考範例程式碼，註解在最下方。

// 刪除產品時的警告跳窗元件
Vue.component('delProductModal', { //元件名稱
  template:`<div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>刪除產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        是否刪除
        <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-danger" @click="delProduct">
          確認刪除
        </button>
      </div>
    </div>
  </div>
</div>`,
  data() {
    return {
    };
  },
  props: ['tempProduct','user'],
  methods: {
    // 刪除商品
    delProduct() {
      const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
      //預設帶入 token
      // "Authorization": "Bearer {token}"
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      axios.delete(url).then(() => {
        $('#delProductModal').modal('hide');
        this.$emit('update');
      });
    },
  },
  });

// 18 取得暫存商品的標題
// 24 執行刪除商品的方法
// 35~39 把屬性 'tempProduct','user' 的資料帶進元件，用來指定特定商品的 url。
// 44~46 執行 axios 刪除遠端資料的方式，刪除後自動關閉視窗並且刷新頁面。