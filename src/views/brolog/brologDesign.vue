<template>
    <a-modal
      :title="action==='new'?'借阅单新增':'修改借阅单'"
      :visible="brologVisible"
      :confirm-loading="confirmLoading"
      cancelText="取消"
      okText="确定"
      @ok="handleOk"
      @cancel="handleCancel"
    >
        <a-form-model :model="brologData"
            ref="ruleForm"
            :rules="rules"
            :label-col="{span:4}"
            :wrapper-col="{ span: 18 }">
            <a-form-model-item  label="借阅单号" prop="brologid">
                <a-input
                    v-model="brologData.brologid" :disabled="true"
                />
            </a-form-model-item>
            <a-form-model-item  label="图书号" prop="bookid">
                <a-input-search
                    v-model="brologData.bookid" 
                    placeholder="请选择图书" enter-button @search="onSearchBook" 
                />
            </a-form-model-item>
            <a-form-model-item  label="图书名称" prop="bookname">
                <a-input
                    v-model="brologData.bookname"
                    :disabled="true" 
                />
            </a-form-model-item>
            <a-form-model-item  label="借书证" prop="readerid">
                <a-input-search
                    v-model="brologData.readerid"
                    placeholder="请选择借阅者" enter-button @search="onSearchReader" 
                />
            </a-form-model-item>
            <a-form-model-item  label="读者名称" prop="readername">
                <a-input
                    v-model="brologData.readername" 
                    :disabled="true" 
                />
            </a-form-model-item>
            <a-form-model-item  label="借书时间" prop="begintime">
                 <a-date-picker  v-model="brologData.begintime" placeholder="请输入借书时间" valueFormat="YYYY-MM-DD"/>
            </a-form-model-item>
            <a-form-model-item  label="还书时间" prop="endtime">
                 <a-date-picker  v-model="brologData.endtime" placeholder="请输入还书时间" valueFormat="YYYY-MM-DD"/>
            </a-form-model-item>
             <a-form-model-item  label="状态" prop="status">
                   <a-select v-model="brologData.status">
                        <a-select-option value="-1">已逾期</a-select-option>
                        <a-select-option value="0">已完成</a-select-option>
                        <a-select-option value="1">借书中</a-select-option>
                   </a-select>
            </a-form-model-item>
        </a-form-model>
        <Dialog ref="dialog" 
          @reponseData='reponseData'
          :dataSource="dataSource" 
          :columns="columns" 
          :title="title"></Dialog>
    </a-modal>
</template>
<script>
import Dialog from '@/components/Dialog/index.vue'
import axios from "axios"
export default {
     props: {
        brologData:Object,
        action:String
    },
    components:{
        Dialog
    },
    data () {
        return {
            brologVisible:false,
            confirmLoading: false,
            rules:{
                bookid:[{ required: true, message: '请输入图书号',trigger: 'blur' }],
                readerid:[{ required: true, message: '请输入借读证',trigger: 'blur' }],
                begintime:[{ required: true, message: '请输入借书时间',trigger: 'blur' }],
            },
            dataSource:[],//弹窗组件table数据
            columns:[],//弹窗组件table头部数据
            title:'',
            chrdata:{},//组件传过来的数据
        }
    },
    methods: {
        reponseData(data){
            //console.log(data);
            this.chrdata = data
            this.fzData()
        },
        //子组件传过来数据赋值
        fzData(){
            if(this.title ==='book'){
                console.log(this.chrdata.data);
                this.brologData.bookid = this.chrdata.bookid
                this.brologData.bookname = this.chrdata.bookname
            }else{
                this.brologData.readerid = this.chrdata.readerid
                this.brologData.readername = this.chrdata.readername
            }
        },
        handleOk(){
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                        this.$emit('saveBrolog')
                        this.brologVisible = false
                } else {
                   console.log('error submit!!');
                   return false;
                }
           });
        },
         handleCancel(){
           // console.log(this.oldreader);
           // this.readerData = this.oldreader
            this.$emit('close')
            this.brologVisible = false
        },
        handleCancel(){
            this.brologVisible = false
        },
        onSearchBook(){
            //console.log("读者");
             this.columns=[
                {
                    title: '图书号',
                    width:200,
                    dataIndex: 'bookid',
                },
                {
                    title: '图书名称',
                    dataIndex: 'bookname',
                    scopedSlots: { customRender: 'bookname' },
                },
            ]
            axios.get('/book/get').then(response=>{
                let res = response.data
                console.log(res);
                if(res.code === 200){
                    this.dataSource = res.booklist
                }
            })
            this.title = 'book'
            this.$refs.dialog.Dialogvisible = true
        },
        onSearchReader(){
            //console.log("读者");
             this.columns=[
                {
                    title: '借书证',
                    width:200,
                    dataIndex: 'readerid',
                },
                {
                    title: '读者名称',
                    dataIndex: 'readername',
                },
            ]
            axios.get('/reader/get').then(response=>{
                let res = response.data
                console.log(res);
                if(res.code === 200){
                    this.dataSource = res.readerlist
                }
            })
            this.title = 'reader'
            this.$refs.dialog.Dialogvisible = true
        }
    }
}
</script>