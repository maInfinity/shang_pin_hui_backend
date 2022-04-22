<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <Search></Search>
    </el-col>
    <el-col :span="12">
      <Category></Category>
    </el-col>
  </el-row>
</template>

<script>
import Category from "./Category";
import Search from "./Search";
export default {
  components: {
    Category,
    Search,
  },
};
</script>

<style>
</style>