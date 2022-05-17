<template>
    <div class="content">
         <a-card style="margin-bottom:24px">
             <a-row>
                 <a-col :span="9">
                    <a-form-model-item label="图书编号：" :labelCol="{span: 8}" :wrapper-col="{ span: 16 }">
                       <a-input v-model="searchbookid" />
                    </a-form-model-item>
                 </a-col>
                 <a-col :span="9">
                    <a-form-model-item label="图书名称" :labelCol="{span: 6}" :wrapper-col="{ span: 16 }">
                       <a-input v-model="searchbookname" />
                    </a-form-model-item>
                 </a-col>
                 <a-col :span="6">
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
        </a-card>
        <div class="content-table">
             <a-page-header
                title="图书查询"
            >
              <template slot="extra">
                   <a-space class="icons-list" size="middle">
                        <a-tooltip>
                            <template slot="title">
                            刷新
                            </template>
                            <a-icon type="reload" @click="refreach"/>
                        </a-tooltip>
                        <a-tooltip>
                            <template slot="title">
                              列设置
                            </template>
                            <a-icon type="setting" />
                        </a-tooltip>
                   </a-space>
               </template>
            </a-page-header>
            <ListView
                :columns="bookHeader"
                :data="bookList"
                :add = addBook
            ></ListView>
        </div>
    </div>
</template>
<script>
import ListView from '@/components/ListView/index.vue'
import pubM from '@/utils/publicMthod.js'
import axios from "axios"
export default {
     mixins: [pubM],
     components: {
        ListView
    },
    data () {
        return {
            bookHeader:[],
            bookList:[],
            bookData:{},
            action:'',
            searchbookid:'',
            searchbookname:''
        }
    },
    created () {
        //图书初始化
        this.bookHeader=[
            {title: '图书编号',width: 200, dataIndex: 'bookid',fixed: 'left',},
            {title: '图书名称',width: 150, dataIndex: 'bookname', 
              scopedSlots: { customRender: 'bookname' },
              key: 'bookname'},
            {title: '作者',width: 100, dataIndex: 'athour', key: 'athour'},
            {title: '价格',width: 100,sorter: (a, b) => a.price - b.price, dataIndex: 'price', key: 'price'},
            {title: '类型', width: 150,dataIndex: 'booktype', key: 'booktype'},
            {title: '出版社', width: 200,dataIndex: 'press', key: 'press'},
            {title: '出版时间',width: 150, dataIndex: 'presstime', key: 'presstime'},
            {title: '库存数量',width: 150, 
             dataIndex: 'invquantity', 
             sorter: (a, b) => a.invquantity - b.invquantity,
             key: 'invquantity'},
            {title: '出借数量', 
             width: 150,
             sorter: (a, b) => a.broquantity - b.broquantity,
             dataIndex: 'broquantity',
               key: 'broquantity'},
        ]
        this.initData()
    },
    methods: {
        initData(){
            axios.get('/book/get').then(response=>{
                let res = response.data
                console.log(res);
                if(res.code === 200){
                    this.bookList = res.booklist
                }
            })
        },
        addBook(){
           this.bookData ={
               bookid:this.getRandomid(),
               bookname:'',
               athour:'',
               price:'',
               booktype:''
           }
           this.action = 'new'
        },
        refreach(){

        },
        onSubmit(){

        }
    }
}
</script>
<style scoped>
.content{
    width: 100%;
    height: 100%;
}
.content-table{
    padding: 12px;
    background-color: #fff !important;
}
</style>