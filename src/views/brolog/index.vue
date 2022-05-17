<template>
    <div class="content">
        <a-card style="margin-bottom:24px">
             <a-row>
                 <a-col :span="8">
                    <a-form-model-item label="借书记录单号：" :labelCol="{span: 8}" :wrapper-col="{ span: 16 }">
                       <a-input v-model="searchbrologid" />
                    </a-form-model-item>
                 </a-col>
                 <a-col :span="8">
                    <a-form-model-item label="图书名称" :labelCol="{span: 6}" :wrapper-col="{ span: 16 }">
                       <a-input v-model="searchbookname" />
                    </a-form-model-item>
                 </a-col>
                 <a-col :span="8">
                    <a-form-model-item label="读者号" :labelCol="{span: 4}" :wrapper-col="{ span: 20}">
                       <a-input v-model="searchreaderid" />
                    </a-form-model-item>
                 </a-col>
             </a-row>
             <a-row>
                <a-col :span="18">
                    <a-form-model-item label="状态:" :labelCol="{span: 2}" :wrapper-col="{ span:10}">
                       <a-radio-group v-model="searchstatus" :options="options" @change="onChange2" />
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
                title="借阅记录"
            >
              <template slot="extra">
                   <a-space class="icons-list" size="middle">
                        <a-button key="1" type="primary" @click="addBrolog">
                        新增
                        </a-button>
                        <a-button key="2" type="primary" @click="clickYhuan">
                          一键还书
                        </a-button>
                        <a-button key="3" type="primary" @click="clickYcui">
                          一键催还
                        </a-button>
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
            :columns="brologHeader"
            :data="brologList"
            @add ="addBrolog"
            @deleteData ="deleteBrolog"
            @updataData ="updataBrolog"
            @clickCui="clickCui"
            @clickHuan ="clickHuan"
            ></ListView>
        </div>
        <brologDesign  ref="brologDesign" @saveBrolog='saveBrolog' @close='close' :brologData='brologData' :action="action"></brologDesign>
    </div>
</template>
<script>
const options =[
  { label: '已完成', value: '0' },
  { label: '借阅中', value: '1' },
  { label: '已逾期', value: '-1' },
];
import ListView from '@/components/ListView/index.vue'
import brologDesign from './brologDesign.vue'
import pubM from '@/utils/publicMthod.js'
import axios from "axios"
export default {
    mixins: [pubM],
    components: {
        ListView,
        brologDesign
    },
    data () {
        return {
            brologHeader:[],
            brologList:[],
            brologData:{},
            action:'new',
            index:0,//当前操作数据得索引
            searchbrologid:'',//检索关键字
            searchbookname:'',
            searchreaderid:'',
            searchstatus:'0',
            options
        }
    },
    created () {
        //读者头部数据初始化
        this.brologHeader=[
            {title: '借阅记录单',width: 200, dataIndex: 'brologid', fixed: 'left', },
            {title: '图书号',width: 200, dataIndex: 'bookid' ,fixed: 'left', },
            {title: '图书名称',width: 200, dataIndex: 'bookname', scopedSlots: { customRender: 'bookname' }, },
            {title: '借书证号',width: 200, dataIndex: 'readerid', },
            {title: '读者名称',width: 100, dataIndex: 'readername'},
            {title: '借书时间',width: 150, dataIndex: 'begintime',
              sorter: (a, b) => new Date(a.begintime).getTime() - new Date(b.begintime).getTime(),},
            {title: '还书时间',width: 150, dataIndex: 'endtime',
              sorter: (a, b) => new Date(a.endtime).getTime() - new Date(b.endtime).getTime()},
            {title: '状态',width: 120, dataIndex: 'status',
              scopedSlots: { customRender: 'status' },},
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
            axios.get('/brolog/get').then(request=>{
                console.log(request);
                let res = request.data
                if(res.code === 200){
                    this.brologList = res.brologlist
                }
            })
        },
        updataBrolog(data){
            this.brologData = data
            this.index = this.brologList.indexOf(data)
            console.log(this.brologData);
            this.action = 'updata'
            this.$refs.brologDesign.brologVisible = true
        },
        deleteBrolog(data){
             this.index = this.brologList.indexOf(data)
             console.log(this.index);
             const then = this
             this.$confirm({
                title: '是否删除',
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                   axios.post('/brolog/delete',data.brologid).then(response=>{
                        let res = response.data
                        console.log(res);
                        if(res.code === 200){
                            then.brologList.splice(then.index,1)
                            then.resDeig(res.code,res.message)
                        }
                   })
                   console.log('OK');
                },
                onCancel() {
                console.log('Cancel');
                },
      });
        },
        addBrolog(){
            console.log('读者新增');
            this.brologData={
                brologid: this.getRandomid(),
                bookid:'',
                bookname:'',
                readerid:'',
                readername:'',
                begintime:'',
                endtime:'',
                status:'0'
            }
            this.action = 'new'
            this.$refs.brologDesign.brologVisible = true
        },
        saveBrolog(){
          //  console.log(this.readerData);
            if(this.action==='new'){
                axios.post('/brolog/add',this.brologData).then(response=>{
                    let res = response.data
                    console.log(res);
                    if(res.data.code === 200){
                        this.brologList.unshift(this.brologData)
                        this.resDeig(res.code,res.message)
                    }
                })
            }else{
                axios.post('/brolog/update',this.brologData).then(response=>{
                    let res = response.data
                    console.log(res);
                    if(res.code === 200){
                        this.brologList.splice(this.index,1,this.brologData)
                        this.resDeig(res.code,res.message)
                    }
                })
            }
        },
        close(){
            if(this.action==='updata'){
                axios.post('/brolog/getid',this.brologData.brologid).then(response=>{
                    let res = response.data
                    console.log(res);
                    if(res.code === 200){
                       this.brologList.splice(this.index,1,res.brolog)                
                    }
                })
            }
        },
        onSubmit(){

        },
        refreach(){
            this.initData()
        },
        onChange2(){

        },
        clickCui(data){
            this.$message.info('已向'+data+'邮箱发送催还信息');
        },
        clickHuan(data){
            this.index = this.brologList.indexOf(data)
            this.brologData = JSON.parse(JSON.stringify(data))
            console.log(data)
            const that = this
            this.$confirm({
                title: '是否还书',
                cancelText:'取消',
                okText:'确定',
                onOk() {
                  that.$message.info(data.readername+'已归还图书《'+data.bookname+"》");
                  that.brologData.status="0"
                  that.brologList.splice(that.index,1,that.brologData)
                },
                onCancel() {
                   console.log('取消');
                },
                class: 'test',
            });
        },
        clickYhuan(){

        },
        clickYcui(){}
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
.icons-list >>> .anticon :hover{
  color: #40a9ff;
}
</style>