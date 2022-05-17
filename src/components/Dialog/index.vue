<template>
    <a-modal v-model="Dialogvisible" 
      cancelText="取消"
      okText="确定"
      :title="title==='book'?'选择图书':'选择读者'" @ok="handleOk">
      <div class="search">
        <a-input placeholder="请输入关键字" v-model="searchkey" />
        <a-button type="primary">
          查询
        </a-button>
      </div>
      <a-table bordered 
        size="small"
        :data-source="dataSource" 
        :rowKey="(record,index)=>{return index}"
        :row-selection="{selectedRowKeys: selectedRowKeys,onChange: onSelectChange,type:'radio'}"
        :scroll="{ y:400}"
        :columns="columns">
        <span slot="bookname" slot-scope="text,record">
          《{{record.bookname}}》
        </span>
      </a-table>
    </a-modal>
</template>
<script>
export default {
    props:{
        dataSource:Array,
        columns:Array,
        title:String
    },
    data () {
        return {
            Dialogvisible:false,
            searchkey:'',
            selectedRowKeys:[],
            data:{},//正在操作的数据
        }
    },
    methods: {
        handleOk(){
          this.$emit('reponseData',this.data)
          this.Dialogvisible = false
        },
        onSelectChange(selectedRowKeys){
          this.selectedRowKeys = selectedRowKeys
         // console.log(this.dataSource[selectedRowKeys[0]]);
          this.data = this.dataSource[selectedRowKeys[0]]
        }
    }
}
</script>
<style scoped>
.search{
  display: flex;
  margin-bottom: 4px;
}
.search .ant-btn{
  margin-left: 4px;
}
</style>