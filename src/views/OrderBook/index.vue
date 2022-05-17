<template>
    <div class="content">
         <a-card style="margin-bottom:24px">
             <a-row>
                 <a-col :span="8">
                    <a-form-model-item label="订购单号" :labelCol="{span: 8}" :wrapper-col="{ span: 16 }">
                       <a-input v-model="searchorderid" />
                    </a-form-model-item>
                 </a-col>
                 <a-col :span="8">
                    <a-form-model-item label="图书名称" :labelCol="{span: 6}" :wrapper-col="{ span: 16 }">
                       <a-input v-model="searchbookname" />
                    </a-form-model-item>
                 </a-col>
                 <a-col :span="8">
                    <a-form-model-item :wrapper-col="{ span: 24, offset: 6 }">
                        <a-button style="margin-right: 10px;">
                            重置
                        </a-button>
                        <a-button type="primary" @click="onSubmit">
                            查询
                        </a-button>
                    </a-form-model-item>
                 </a-col>
             </a-row>
             <a-row>
                <a-col :span="8">
                    <a-form-model-item label="验收状态:" :labelCol="{span: 8}" :wrapper-col="{ span:16}">
                       <a-radio-group v-model="searchstatus" :options="options" @change="onChange2" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="6">
                     
                 </a-col>
             </a-row>
        </a-card>
        <div class="content-table">
             <ListView
            :columns="orderBookHeader"
            :data="orderBookList"
            @add ="addOrderBook"
            @deleteData ="deleteOrderBook"
            @updataData ="updataOrderBook"
            ></ListView>
        </div>
    </div>
</template>
<script>
const options =[
  { label: '验收', value: '1' },
  { label: '未验收', value: '-1' },
];
import ListView from '@/components/ListView/index.vue'
import axios from "axios"
export default {
    components: {
        ListView,
    },
    data () {
        return {
            orderBookHeader:[],
            orderBookList:[],
            searchstatus:'',
            options,
            searchbookname:'',
            searchorderid:''

        }
    },
    created () {
        this.orderBookHeader=[
            {title: '订购单号',width: 200, dataIndex: 'orderbookid', fixed: 'left', },
            {title: '书籍编号',width: 200, dataIndex: 'bookid'  },
            {title: '书籍名称',width: 200, dataIndex: 'bookname',scopedSlots: { customRender: 'bookname' }, },
            {title: '作者',width: 100, dataIndex: 'author' },
            {title: '订购数量',width: 100, dataIndex: 'orderquantily' },
            {title: '订购单价',width: 100, dataIndex: 'price' },
            {title: '验收',width: 150, dataIndex: 'warehouse',scopedSlots: { customRender: 'warehouse' }, },
            {title: '验收日期',width: 150, dataIndex: 'warehousetime' },
            {title: '目前库存',width: 100, dataIndex: 'invquantity' },
            {title: '操作员',width: 100, dataIndex: 'operator' },
            {
                title: '操作',
                width: 140,
                fixed: 'right',
                key: 'action',
                scopedSlots: { customRender: 'action' },
            },
        ]
        this.initData()
    },
    methods: {
        onChange2(){},
        onSubmit(){},
        initData(){
              axios.get('/orderbook/get').then(request=>{
                console.log(request);
                let res = request.data
                if(res.code === 200){
                    this.orderBookList = res.orderbooklist
                }
            })
        },
        addOrderBook(){

        },
        deleteOrderBook(){

        },
        updataOrderBook(){

        }
    }
}
</script>
<style scoped>
.content-table{
    padding: 12px;
    background-color: #fff !important;
}
</style>