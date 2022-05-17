<template>
    <a-table :columns="columns" 
    :row-selection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
    :rowKey="(record,index)=>{return index}" 
    :data-source="data" 
    :scroll="{ x: 1024}">
      <span slot="bookname" slot-scope="text,record">
          《{{record.bookname}}》
      </span>
       <span slot="status" slot-scope="text,record">
          <a-badge :status="record.status==='1'?'processing':record.status==='-1'?'error':'success'" />
          <span v-if="record.status==='1'">
              <span style="margin-right:4px">借阅中</span>
              <a href="javascript:;"><span @click="clickHuan(record)">还书</span></a>
          </span>
          <span v-if="record.status==='0'">已归还</span>
          <span v-if="record.status==='-1'">
              <span style="margin-right:4px">已逾期</span>
              <a href="javascript:;"><span @click="clickCui(record.readername)">催还</span></a>
          </span>
       </span>
        <span slot="warehouse" slot-scope="text,record">
          <a-badge :status="record.warehouse==='1'?'success':'processing'" />
          <span v-if="record.warehouse==='1'">
              <span style="margin-right:4px">已验收</span>
          </span>
          <span v-if="record.warehouse==='-1'">
              <span style="margin-right:4px">未验收</span>
              <a href="javascript:;"><span @click="clickys(record)">验收</span></a>
          </span>
       </span>
       <a slot="action" slot-scope="text,record" href="javascript:;">
           <span @click="add" style="margin-right:5px">新增</span>
           <span @click="deleteData(record)" style="margin-right:5px">删除</span>
           <span @click="updataData(record)">修改</span>
       </a>
    </a-table>
</template>
<script>
export default {
    props: {
        columns:Array,
        data:Array
    },
    data () {
        return {
            selectedRowKeys: []
        }
    },
    methods: {
        add(){
            //console.log("add");
            this.$emit("add")
        },
        deleteData(data){
            console.log(data);
            this.$emit("deleteData",data)
        },
        updataData(data){
            console.log(data);
            this.$emit("updataData",data)
        },
        clickCui(data){
            this.$emit("clickCui",data)
        },
        clickHuan(data){
            this.$emit("clickHuan",data)
        },
        onSelectChange(selectedRowKeys) {
           // console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.selectedRowKeys = selectedRowKeys;
       },
       clickys(data){
           
       }
    }
}
</script>
<style scoped>

</style>