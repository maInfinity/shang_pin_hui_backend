<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="getCategory2Id"
          :disabled="show"
        >
          <el-option
            :label="opt.name"
            :value="opt.id"
            v-for="opt in list1"
            :key="opt.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="getCategory3Id"
          :disabled="show"
        >
          <el-option
            :label="opt.name"
            :value="opt.id"
            v-for="opt in list2"
            :key="opt.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category3Id"
          @change="sendCategory3Id"
          :disabled="show"
        >
          <el-option
            :label="opt.name"
            :value="opt.id"
            v-for="opt in list3"
            :key="opt.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  props:['show'],
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await this.$API.attr.reqGetCategory1List();
      if (res.code == 200) {
        this.list1 = res.data;
      }
    },
    async getCategory2Id() {
      this.list2 = [];
      this.list3 = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      this.$emit("getCategoryId", {categoryId:this.cForm.category1Id, level:1});
      let res = await this.$API.attr.reqGetCategory2List(
        this.cForm.category1Id
      );
      if (res.code == 200) {
        this.list2 = res.data;
      }
    },
    async getCategory3Id() {
      this.list3 = [];
      this.cForm.category3Id = "";
      this.$emit("getCategoryId", {categoryId:this.cForm.category2Id, level:2});
      let res = await this.$API.attr.reqGetCategory3List(
        this.cForm.category2Id
      );
      if (res.code == 200) {
        this.list3 = res.data;
      }
    },
    sendCategory3Id() {
      this.$emit("getCategoryId", {categoryId:this.cForm.category3Id, level:3});
    },
  },
};
</script>

<style>
</style>