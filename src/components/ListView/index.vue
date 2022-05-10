<template>
    <a-table :columns="columns" :rowKey="(record,index)=>{return index}" :data-source="data" :scroll="{ x: 1500, y: 300 }">
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
        }
    }
}
</script>