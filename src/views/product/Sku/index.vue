<template>
  <div>
    <el-table style="width: 100%" border :data="skuList">
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column label="默认图片" width="width">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" style="width: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(kg)" width="width">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="80">
      </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-top"
            v-if="row.isSale == 1"
            @click="cancelSale(row)"
          ></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-bottom"
            @click="onSale(row)"
            v-else
          ></el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="$message('该功能在开发中')"
          ></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-info"
            @click="drawer(row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <el-drawer :visible.sync="show" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            type="success"
            v-for="attr in skuInfo.skuAttrValueList"
            :key="attr.id"
          >
            {{ attr.valueName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel>
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" style="width: 100%" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      skuList: [],
      skuInfo: {},
      show: false,
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    handleCurrentChange(pager) {
      this.page = pager;
      this.getSkuList(this.page);
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    async getSkuList(pager = 1) {
      this.page = pager;
      let res = await this.$API.sku.reqSkuList(this.page, this.limit);
      if (res.code == 200) {
        this.total = res.data.total;
        this.skuList = res.data.records;
      }
    },
    async onSale(row) {
      let res = await this.$API.sku.reqOnSale(row.id);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "上架成功",
        });
        row.isSale = 1;
      }
    },
    async cancelSale(row) {
      let res = await this.$API.sku.reqCancelSale(row.id);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "下架成功",
        });
        row.isSale = 0;
      }
    },
    async drawer(row) {
      let res = await this.$API.sku.reqSkuById(row.id);
      if (res.code == 200) {
        this.skuInfo = res.data;
      }
      this.show = true;
    },
  },
};
</script>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col-16 {
  margin-left: 20px;
}
</style>