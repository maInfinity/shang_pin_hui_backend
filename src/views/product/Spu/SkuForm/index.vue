<template>
  <div>
    <el-form ref="form" label-width="80px" :model="skuInfo">
      <el-form-item label="SPU名称"> {{ spu.spuName }} </el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item
            :label="attr.attrName"
            v-for="attr in attrInfoList"
            :key="attr.id"
          >
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item
            :label="spuSaleAttr.saleAttrName"
            v-for="spuSaleAttr in spuSaleAttrList"
            :key="spuSaleAttr.id"
          >
            <el-select
              placeholder="请选择"
              v-model="spuSaleAttr.attrIdAndValueId"
            >
              <el-option
                :label="spuSaleAttrValue.saleAttrValueName"
                :value="`${spuSaleAttr.id}:${spuSaleAttrValue.id}`"
                v-for="spuSaleAttrValue in spuSaleAttr.spuSaleAttrValueList"
                :key="spuSaleAttrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          style="width: 100%"
          border
          :data="spuImageList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="80"> </el-table-column>
          <el-table-column label="图片" width="width">
            <template slot-scope="{ row }">
              <img :src="row.imgUrl" style="width: 100px" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                v-show="row.isDefault == 0"
                @click="changeDefaultImg(row)"
                >设为默认</el-button
              >
              <el-tag type="success" v-show="row.isDefault == 1">默认</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSkuInfo">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      skuInfo: {
        // 父组件给的
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 双向绑定的
        price: 0,
        skuDesc: "",
        skuName: "",
        weight: "",
        // 第三类
        skuAttrValueList: [],
        skuDefaultImg: "",
        skuImageList: [],
        skuSaleAttrValueList: [],
      },
      spu: {},
      imageList: [],
    };
  },
  methods: {
    async getData(category1Id, category2Id, spu) {
      //填充父组件带有的数据到 skuInfo中
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.spu = spu;

      let res1 = await this.$API.sku.reqSpuImageList(spu.id);
      let res2 = await this.$API.sku.reqSpuSaleAttrList(spu.id);
      let res3 = await this.$API.sku.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (res1.code == 200) {
        let list = res1.data;
        list.forEach((item) => {
          item.isDefault = "0";
        });
        this.spuImageList = list;
      }
      if (res2.code == 200) {
        this.spuSaleAttrList = res2.data;
      }
      if (res3.code == 200) {
        this.attrInfoList = res3.data;
      }
    },
    handleSelectionChange(image) {
      this.imageList = image;
    },
    changeDefaultImg(row) {
      this.spuImageList.forEach((item) => {
        item.isDefault = "0";
      });
      row.isDefault = "1";
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    cancel() {
      this.$emit("changeSceneFromSkuForm", 0);
      Object.assign(this._data, this.$options.data());
    },
    async saveSkuInfo() {
      let { spuSaleAttrList, attrInfoList, imageList, skuInfo } = this;
      // 整理 skuAttrValueList数据
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(":");
          prev.push({ attrId, valueId });
        }
        return prev;
      }, []);
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.attrIdAndValueId.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
      }, []);
      skuInfo.skuImageList = imageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });
      let res = await this.$API.sku.reqSaveSkuInfo(skuInfo);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "保存成功",
        });
        this.$emit("changeSceneFromSkuForm", 0);
        Object.assign(this._data, this.$options.data());
      }
    },
  },
};
</script>

<style>
</style>