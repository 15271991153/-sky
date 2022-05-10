import Mock from 'mockjs'
const Random = Mock.Random
const pubm={
    methods: {
        //获取读者id
        getRandomid(){
            let code =Random.id()
            return code
        },
        //请求操作弹窗
        resDeig(code,message){
            if(code===200){
                this.$success({
                    title: message,
                });
            }else{
                this.$error({
                    title: message,
                });
            }
        }
    }
}
export default pubm