<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加Spu</el-button
        >
        <el-table :data="records" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="Spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="Spu描述" width="width">
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row }">
              <el-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="showSkuInfo(row)"
              ></el-button>
              <el-popconfirm
                style="margin-left: 10px"
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
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
      </div>
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <SkuForm
        v-show="scene == 2"
        ref="sku"
        @changeSceneFromSkuForm="changeSceneFromSkuForm"
      ></SkuForm>
    </el-card>
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="closeDialog"
    >
      <el-table :data="skuInfoList" v-loading="loading">
        <el-table-column
          prop="skuName"
          label="名称"
          width="width"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="width"
        ></el-table-column>
        <el-table-column
          prop="weight"
          label="重量"
          width="width"
        ></el-table-column>
        <el-table-column label="默认图片" width="width">
          <template slot-scope="{ row }">
            <img :src="row.skuDefaultImg" style="width: 100px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page: 1,
      limit: 3,
      total: 0,
      records: [],
      scene: 0,
      dialogTableVisible: false,
      spu: {},
      skuInfoList: [],
      loading: true,
    };
  },
  components: {
    SpuForm,
    SkuForm,
  },
  methods: {
    // 根据三级分类选择器填充 三个分类
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    async getSpuList(pager = 1) {
      this.page = pager;
      const { page, limit, category3Id } = this;
      let res = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (res.code == 200) {
        this.total = res.data.total;
        this.records = res.data.records;
      }
    },
    handleCurrentChange(pager) {
      this.page = pager;
      this.getSpuList(this.page);
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    addSpu() {
      this.scene = 1;
      this.$refs.spu.addSpuData(this.category3Id);
    },
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.initData(row);
    },
    changeScene({ scene, flag }) {
      this.scene = scene;
      if (flag == "添加") {
        this.getSpuList();
      } else {
        this.getSpuList(this.page);
      }
    },
    async deleteSpu(row) {
      let res = await this.$API.spu.reqDeleteSpu(row.id);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    addSku(row) {
      this.scene = 2;
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    changeSceneFromSkuForm(scene) {
      this.scene = scene;
    },
    async showSkuInfo(spu) {
      this.dialogTableVisible = true;
      this.spu = spu;
      const res = await this.$API.spu.reqFindBySpuId(spu.id);
      if (res.code == 200) {
        this.skuInfoList = res.data;
        this.loading = false;
      }
    },
    closeDialog(done) {
      this.loading = true;
      this.skuInfoList = [];
      done();
    },
  },
};
</script>

<style>
</style>