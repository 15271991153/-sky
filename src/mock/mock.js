import Mock from 'mockjs'
const Random = Mock.Random
// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
    timeout: '300-600'
})

//读者相关
let _data = []
for (let i = 0; i < 20; i++) {
    let newList = { // 详细 规则 参照mockjs官网
    readerid: Random.id(), //  Random.csentence( min, max )
    readername: Random.cname(), // Random.cname() 随机生成中文名
    readerage: Random.integer(10,90),//随机生成年龄
    emial: Random.email('qq.com'),//随机生成邮箱
    readeradd:`${Random.province()}-${Random.city()}-${Random.county()}` // 随机生成地址
    }
    _data.push(newList)
}
//获取读者列表
function getReader(){
    if (!localStorage.getItem('readerlist')) {
        localStorage.setItem('readerlist',JSON.stringify(_data))
    }
   var readerlist = JSON.parse(localStorage.getItem('readerlist'))
   //console.log(readerlist);
   return {code:200,readerlist:readerlist}
}
//根据id获取读者信息
function getReaderId(options){
    //拉取读者列表
    var readerlist = JSON.parse(localStorage.getItem('readerlist'))
    for( let index in readerlist) {
        if (readerlist[index].readerid === options.body) {
          var reader = readerlist[index]
          return {code:200,reader:reader}
        }
    }
}
//添加读者信息
function addReader(options){
  var readerlist = JSON.parse(localStorage.getItem('readerlist'))
  // 获取传入用户信息对象，是一个字符串，需要转化为对象
  var reader = JSON.parse(options.body)
  // 将 user 插入到 userlist 中
  readerlist.unshift(reader)
  // 重新将 userlist 存入 localStorage 中
  localStorage.setItem('readerlist', JSON.stringify(readerlist))
  return {
    data: {code:200,message:'读者添加成功'}
  }
}
//删除读者信息--根据传递的id删除用户
function deleteReader(options){
    //拉取readerlist
    var readerlist = JSON.parse(localStorage.getItem('readerlist'))
    //根据传入id删除用户
    for( let index in readerlist ) {
        if (readerlist[index].readerid === options.body) {
          readerlist.splice(index,1)
          //存储readerlist
          localStorage.setItem('readerlist', JSON.stringify(readerlist))
        }
    }
    return {code:200,message:'删除成功'}
}
//更新读者信息
function updataReader(options){
    //拉取readerlist
    var readerlist = JSON.parse(localStorage.getItem('readerlist'))
    //获取传入的读者信息
    var reader= JSON.parse(options.body)
    //遍历 更新
    for(let index in readerlist){
        //对比id更新信息
        if(readerlist[index].readerid === reader.readerid){
            readerlist[index] = reader
        }
    }
    //存储
    localStorage.setItem('readerlist', JSON.stringify(readerlist))
    return {code:200,message:'信息更新成功'}
}
// url为要拦截的请求地址  请求方式  请求数据（规则） （此处api会被mockjs拦截）
Mock.mock('/reader/get','get',getReader)
Mock.mock('/reader/add','post',addReader)
Mock.mock('/reader/delete','post',deleteReader)
Mock.mock('/reader/update','post',updataReader)
Mock.mock('/reader/getid','post',getReaderId)


//图书相关
var _book = []
for (let i = 0; i < 20; i++) {
    _book.push(Mock.mock({
        bookid:'@id',
        bookname:'@ctitle(3, 5)',
        athour:'@cname',
        price:'@integer(1,100)',
        'booktype|1':['益智启蒙','儿童文学','亲子','育儿','儿童绘本','随笔','传记','诗歌','名著','古籍'],
        press:'@ctitle(3, 5)'+'出版社',
        presstime:"@date()",
        'invquantity|1-100':100,
        'broquantity|1-100':100
    }))
}
//获取图书列表
function getBook(){
    //localStorage.setItem('booklist',JSON.stringify(_book))
   if (!localStorage.getItem('booklist')) {
        localStorage.setItem('booklist',JSON.stringify(_book))
   }
   var booklist = JSON.parse(localStorage.getItem('booklist'))
   //console.log(readerlist);
   return {code:200,booklist:booklist}
}
//根据id获取图书列表
function getBookId(options){
    //拉取图书list
    var booklist = JSON.parse(localStorage.getItem('booklist'))
    for(let index in booklist){
        if(booklist[index].bookid === options.body){
            var book = booklist[index]
            return {code:200,book:book}
        }
    }
}
//增加图书列表
function addBook(options){
    //拉取booklist
    var booklist = JSON.parse(localStorage.getItem('booklist'))
    //获取传入book
    var book = JSON.parse(options.body)
    //插入
    booklist.unshift(book) 
    //更新
    localStorage.setItem('booklist', JSON.stringify(booklist))
    return {code:200,message:'图书添加成功'}
}
//删除图书-根据id删除
function deleteBook(options){
    //拉取图书list
    var booklist = JSON.parse(localStorage.getItem('booklist'))
    for( let index in booklist ) {
        if (booklist[index].bookid === options.body) {
            booklist.splice(index,1)
          //存储readerlist
          localStorage.setItem('booklist', JSON.stringify(booklist))
        }
    }
    return {code:200,message:'删除成功'}
}
//更新图书信息
function updateBook(options){
    //拉取读者list
    var booklist = JSON.parse(localStorage.getItem('booklist'))
    //获取传入的读者信息
    var book= JSON.parse(options.body)
    //遍历 更新
    for(let index in booklist){
        //对比id更新信息
        if(booklist[index].bookid === book.bookid){
            booklist[index] = book
        }
    }
    //存储
    localStorage.setItem('booklist', JSON.stringify(booklist))
    return {code:200,message:'信息更新成功'}
}
//设置图书url
Mock.mock('/book/get','get',getBook)
Mock.mock('/book/getid','post',getBookId)
Mock.mock('/book/delete','post',deleteBook)
Mock.mock('/book/add','post',addBook)
Mock.mock('/book/update','post',updateBook)

//借阅记录
//图书相关
var _brolog = []
for (let i = 0; i < 20; i++) {
    _brolog.push(Mock.mock({
        brologid:'@id',//借阅单id
        bookid:'@id',
        bookname:'@ctitle(3, 5)',
        readerid:'@id',
        readername:'@cname',
        begintime:'@datetime("yyyy-MM-dd")',
        endtime:'@datetime("yyyy-MM-dd")',
        "status|1":['0','1','-1']//0已完成，1借书中，-1已逾期
    }))
}
//获取借阅记录
function getBrolog(){
    //localStorage.setItem('brologlist',JSON.stringify(_brolog))
    if (!localStorage.getItem('brologlist')) {
         localStorage.setItem('brologlist',JSON.stringify(_brolog))
    }
    var brologlist = JSON.parse(localStorage.getItem('brologlist'))
    //console.log(readerlist);
    return {code:200,brologlist:brologlist}
}
//根据id获取借阅记录
function getBrologId(options){
    //拉取图书list
    var brologlist = JSON.parse(localStorage.getItem('brologlist'))
    for(let index in brologlist){
        if(brologlist[index].brologid === options.body){
            var brolog = brologlist[index]
            return {code:200,brolog:brolog}
        }
    }
}
//增加借阅记录
function addBrolog(options){
    //brologlist
    var brologlist = JSON.parse(localStorage.getItem('brologlist'))
    //获取传入book
    var brolog = JSON.parse(options.body)
    //插入
    brologlist.unshift(brolog) 
    //更新
    localStorage.setItem('brologlist', JSON.stringify(brologlist))
    return {code:200,message:'借阅记录添加成功'}
}
//删除图书-根据id删除
function deleteBrolog(options){
    //拉取图书list
    var brologlist = JSON.parse(localStorage.getItem('brologlist'))
    for( let index in brologlist ) {
        if (brologlist[index].brologid === options.body) {
            brologlist.splice(index,1)
          //存储readerlist
          localStorage.setItem('brologlist', JSON.stringify(brologlist))
        }
    }
    return {code:200,message:'删除成功'}
}
//更新图书信息
function updateBrolog(options){
    //拉取读者list
    var brologlist = JSON.parse(localStorage.getItem('brologlist'))
    //获取传入的读者信息
    var brolog= JSON.parse(options.body)
    //遍历 更新
    for(let index in brologlist){
        //对比id更新信息
        if(brologlist[index].brologid === brolog.brologid){
            brologlist[index] = brolog
        }
    }
    //存储
    localStorage.setItem('brologlist', JSON.stringify(brologlist))
    return {code:200,message:'信息更新成功'}
}
//设置借阅记录url
Mock.mock('/brolog/get','get',getBrolog)
Mock.mock('/brolog/getid','post',getBrologId)
Mock.mock('/brolog/delete','post',deleteBrolog)
Mock.mock('/brolog/add','post',addBrolog)
Mock.mock('/brolog/update','post',updateBrolog)
//新书订购相关
var _orderbook= []
for (let i = 0; i < 20; i++) {
    _orderbook.push(Mock.mock({
        orderbookid:'@id',//借阅单id
        bookid:'@id',
        bookname:'@ctitle(3, 5)',
        author:'@cname',
        'orderquantily|1-100':100,
        'price|1-100':100,
        'warehouse|1':['1','-1'],//1已验收，-1未验收
        readerid:'@id',
        readername:'@cname',
        warehousetime:'@datetime("yyyy-MM-dd")',
        'invquantity|1-100':100,
        "operator|1":['admin','管理员']//
    }))
}
//获取订购单
function getOrderBook(){
    //localStorage.setItem('orderbooklist',JSON.stringify(_orderbook))
    if (!localStorage.getItem('orderbooklist')) {
         localStorage.setItem('orderbooklist',JSON.stringify(_orderbook))
    }
    var orderbooklist = JSON.parse(localStorage.getItem('orderbooklist'))
    //console.log(readerlist);
    return {code:200,orderbooklist:orderbooklist}
}
//设置订购单url
Mock.mock('/orderbook/get','get',getOrderBook)
