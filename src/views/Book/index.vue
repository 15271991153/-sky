<template>
    <div>
         <ListView
            :columns="bookHeader"
            :data="bookList"
            :add = addBook
        ></ListView>
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
            action:''
        }
    },
    created () {
        //图书初始化
        this.bookHeader=[
            {title: '图书编号', dataIndex: 'bookid', key: 'bookid'},
            {title: '图书名称', dataIndex: 'bookname', key: 'bookname'},
            {title: '作者', dataIndex: 'athour', key: 'athour'},
            {title: '价格', dataIndex: 'price', key: 'price'},
            {title: '类型', dataIndex: 'booktype', key: 'booktype'},
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
        }
    }
}
</script>