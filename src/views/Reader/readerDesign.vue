<template>
    <a-modal
      :title="action==='new'?'读者新增':'修改信息'"
      :visible="readerVisible"
      :confirm-loading="confirmLoading"
      cancelText="取消"
      okText="确定"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model :model="readerData"
        ref="ruleForm"
        :rules="rules"
        :label-col="{span:4}"
        :wrapper-col="{ span: 18 }">
        <a-form-model-item  label="借书证号" prop="readerid">
            <a-input
                v-model="readerData.readerid" :disabled="true"
            />
        </a-form-model-item>
        <a-form-model-item label="读者名称" prop="readername">
            <a-input
                v-model="readerData.readername"
            />
        </a-form-model-item>
         <a-form-model-item label="读者年龄" prop="readerage">
            <a-input
                v-model="readerData.readerage"
            />
        </a-form-model-item>
        <a-form-model-item label="读者邮箱" prop="emial">
            <a-input
                v-model="readerData.emial"
            />
        </a-form-model-item>
        <a-form-model-item label="读者住址" prop="readeradd">
            <a-input
                v-model="readerData.readeradd"
            />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
</template>
<script>
export default {
    props: {
        readerData:Object,
        action:String
    },
    data () {
        return {
            oldreader:{},
            readerVisible:false,
            confirmLoading: false,
            rules:{
                readerid:[{ required: true, message: '请输入借读证',trigger: 'blur' }],
                readername:[{ required: true, message: '请输入读者名称',trigger: 'blur' }],
                emial:[{pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '邮箱格式不正确',trigger: 'blur' }]
            }
        }
    },
    mounted () {
    },
    methods: {
        handleOk(){
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                        this.$emit('saveReader')
                  this.readerVisible = false
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
            this.readerVisible = false
        }
    }
}
</script>