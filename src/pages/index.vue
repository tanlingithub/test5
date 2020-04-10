<template>
  <div>
    <config-table
      name="基础表格"
      :visible="false"
      :pagination="configTablePagination"
      :is-operation="false"
      operation-name="操作"
      :table-data="configTableTabledata"
      :table-data-static="configTableTabledatastatic"
      :table-config="configTableTableconfig"
      :parameter-list="configTableParameterlist"
      url="/deepexi-domain-member/domain/sdk/expirePoints"
      table-data-handler="function handleData(response) {
  return {
    // 重要：！！返回表格数据
    tableData: response.data
  };
}"
      app-key="URRHSIJj"
      app-secret="12bd50ab90ed999610a16e338820ff35183c8771"
      method="POST"
      v-roles="''"
    ></config-table>
  </div>
</template>
<script>
export default {
  components: {},
  data: function() {
    return {
      pageName: "首页",
      configTablePagination: [10],
      configTableTabledata: [{}],
      configTableTabledatastatic: [],
      configTableTableconfig: [
        {
          label: "序号",
          name: "index"
        },
        {
          label: "创建时间",
          name: "creatAt"
        },
        {
          label: "修改时间",
          name: "updateAt"
        },
        {
          label: "创建人",
          name: "createBy"
        }
      ],
      configTableParameterlist: []
    }
  },
  mounted: function() {},
  watch: {},
  methods: {},
  destroyed: function() {}
}
</script>
<style lang="less" scoped="scoped"></style>
