<template>
    <div class="content">
        <a-card style="margin-bottom:24px">
             <a-row>
                 <a-col :span="8">
                    <a-form-model-item label="借书证号：" :labelCol="{span: 5}" :wrapper-col="{ span: 16 }">
                       <a-input v-model="searchkey" />
                    </a-form-model-item>
                 </a-col>
                 <a-col :span="8"></a-col>
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
        </a-card>
        <div class="content-table">
            <a-page-header
                title="读者信息"
            >
              <template slot="extra">
                   <a-space class="icons-list" size="middle">
                        <a-button key="1" type="primary" @click="addReader">
                        新增
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
            :columns="readerHeader"
            :data="readerList"
            @add ="addReader"
            @deleteData ="deleteReader"
            @updataData ="updataReader"
            ></ListView>
        </div>
        <readerDesign  ref="readerDesign" @saveReader='saveReader' @close='close' :readerData='readerData' :action="action"></readerDesign>
    </div>
</template>
<script>
import ListView from '@/components/ListView/index.vue'
import readerDesign from './readerDesign.vue'
import pubM from '@/utils/publicMthod.js'
import axios from "axios"
export default {
    mixins: [pubM],
    components: {
        ListView,
        readerDesign
    },
    data () {
        return {
            readerHeader:[],
            readerList:[],
            readerData:{},
            action:'new',
            index:0,//当前操作数据得索引
            searchkey:'',//检索关键字
        }
    },
    created () {
        //读者头部数据初始化
        this.readerHeader=[
            {title: '借书证号',width: 200, dataIndex: 'readerid', fixed: 'left', },
            {title: '读者名称',width: 100, dataIndex: 'readername'},
            {title: '读者年龄',width: 100, dataIndex: 'readerage'},
            {title: '读者邮箱',width: 200, dataIndex: 'emial'},
            {title: '读者住址', dataIndex: 'readeradd'},
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
            axios.get('/reader/get').then(request=>{
                console.log(request);
                let res = request.data
                if(res.code === 200){
                    this.readerList = res.readerlist
                }
            })
        },
        updataReader(data){
            this.readerData = data
            this.index = this.readerList.indexOf(data)
            console.log(this.index);
            this.action = 'updata'
            this.$refs.readerDesign.readerVisible = true
        },
        deleteReader(data){
             this.index = this.readerList.indexOf(data)
             console.log(this.index);
             const then = this
             this.$confirm({
                title: '是否删除',
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                   axios.post('/reader/delete',data.readerid).then(response=>{
                        let res = response.data
                        console.log(res);
                        if(res.code === 200){
                            then.readerList.splice(then.index,1)
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
        addReader(){
            console.log('读者新增');
            this.readerData={
                readerid: this.getRandomid(),
                readername:'',
                readerage:'',
                emial:'',
                readeradd:''
            }
            this.action = 'new'
            this.$refs.readerDesign.readerVisible = true
        },
        saveReader(){
            console.log(this.readerData);
            if(this.action==='new'){
                axios.post('/reader/add',this.readerData).then(response=>{
                    let res = response.data
                    console.log(res);
                    if(res.data.code === 200){
                        this.readerList.unshift(this.readerData)
                        this.resDeig(res.data.code,res.data.message)
                    }
                })
            }else{
                axios.post('/reader/update',this.readerData).then(response=>{
                    let res = response.data
                    console.log(res);
                    if(res.code === 200){
                        this.readerList.splice(this.index,1,this.readerData)
                        this.resDeig(res.code,res.message)
                    }
                })
            }
        },
        close(){
            if(this.action==='updata'){
                axios.post('/reader/getid',this.readerData.readerid).then(response=>{
                    let res = response.data
                    console.log(res);
                    if(res.code === 200){
                       this.readerList.splice(this.index,1,res.reader)                
                    }
                })
            }
        },
        onSubmit(){

        },
        refreach(){
            this.initData()
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
.icons-list >>> .anticon :hover{
  color: #40a9ff;
}
</style>