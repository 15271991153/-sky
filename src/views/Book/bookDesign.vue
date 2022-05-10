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
    <a-form-model :model="bookData"
        ref="ruleForm"
        :rules="rules"
        :label-col="{span:4}"
        :wrapper-col="{ span: 18 }">
        </a-form-model>
    </a-modal>
</template>
<script>
export default {
    props:{
        bookData:Object,
        action:String 
    }
}
</script>