<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            v-for="tm in trademarkList"
            :key="tm.id"
            :value="tm.id"
            :label="tm.tmName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" v-model="spu.description"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          :file-list="spuImageList"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectedAttr.length}种未选`"
          v-model="attrIdAndName"
        >
          <el-option
            v-for="attr in unSelectedAttr"
            :key="attr.id"
            :label="attr.name"
            :value="`${attr.id}:${attr.name}`"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndName"
          @click="addAttr"
          >添加销售属性</el-button
        >
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="tag in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice($index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                size="small"
                @blur="handleInputConfirm(row)"
                @keyup.enter.native="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addAttrValue(row)"
                >+ New Tag</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ $index }">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        category3Id: 0,
        description: "",
        spuName: "",
        tmId: "",
        spuImageList: [],
        spuSaleAttrList: [],
      },
      trademarkList: [],
      spuImageList: [],
      baseSaleAttrList: [],
      // 销售属性位置选择的ID
      attrIdAndName: "",
    };
  },
  methods: {
    handleRemove(_, fileList) {
      this.spuImageList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async initData(spu) {
      let resSpuById = await this.$API.spu.reqSpuById(spu.id);
      if (resSpuById.code == 200) {
        this.spu = resSpuById.data;
      }
      let resTrademarkList = await this.$API.spu.reqTrademarkList();
      if (resTrademarkList.code == 200) {
        this.trademarkList = resTrademarkList.data;
      }
      let resSpuImageList = await this.$API.spu.reqSpuImageList(spu.id);
      if (resSpuImageList.code == 200) {
        let list = resSpuImageList.data;
        list.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = list;
      }
      let resBaseSaleAttrList = await this.$API.spu.reqBaseSaleAttrList();
      if (resBaseSaleAttrList.code == 200) {
        this.baseSaleAttrList = resBaseSaleAttrList.data;
      }
    },
    async addSpuData(category3Id) {
      this.spu.category3Id = category3Id;
      let resTrademarkList = await this.$API.spu.reqTrademarkList();
      if (resTrademarkList.code == 200) {
        this.trademarkList = resTrademarkList.data;
      }
      let resBaseSaleAttrList = await this.$API.spu.reqBaseSaleAttrList();
      if (resBaseSaleAttrList.code == 200) {
        this.baseSaleAttrList = resBaseSaleAttrList.data;
      }
    },
    handleUploadSuccess(_, _1, fileList) {
      this.spuImageList = fileList;
    },
    addAttr() {
      let [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(":");
      this.spu.spuSaleAttrList.push({
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      });
      this.attrIdAndName = "";
    },
    addAttrValue(row) {
      // .
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
    },
    handleInputConfirm(row) {
      let { baseSaleAttrId, inputValue } = row;
      if (inputValue.trim() == "") {
        this.$message("值不能为空");
        return;
      }
      let list = row.spuSaleAttrValueList;
      let flag = list.some((item) => {
        return item.saleAttrValueName == inputValue;
      });
      if (flag) {
        this.$message("有重复值");
        return;
      }
      row.spuSaleAttrValueList.push({
        baseSaleAttrId,
        saleAttrValueName: inputValue,
      });
      row.inputVisible = false;
    },
    async addOrUpdateSpu() {
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        };
      });
      let res = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
      if (res.code == 200) {
        this.$message({ type: "success", message: "成功" });
        this.$emit("changeScene", {
          scene: 0,
          flag: this.spu.id ? "修改" : "添加",
        });
      }
      Object.assign(this._data, this.$options.data());
    },
    cancel() {
      this.$emit("changeScene", { scene: 0, flag: "" });
      Object.assign(this._data, this.$options.data());
    },
  },
  computed: {
    unSelectedAttr() {
      let { spuSaleAttrList } = this.spu;
      let { baseSaleAttrList } = this;
      return baseSaleAttrList.filter((item) => {
        return spuSaleAttrList.every((ele) => {
          return ele.saleAttrName != item.name;
        });
      });
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>