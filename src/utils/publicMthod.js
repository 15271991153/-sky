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
        },
        //日期转换成时间戳
        getTime(data){
            var data1 = new Date(data) 
            var times = data1.getTime()
            return times
        }
    }
}
export default pubm