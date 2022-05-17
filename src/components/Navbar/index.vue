<template>
    <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu theme="dark"
            @click="handleClick"
            mode="inline" 
            :selectedKeys="[$route.path]">
            <a-sub-menu
             v-for="(item,index) in navMenu"
             :key="index">
               <span slot="title"><a-icon :type="item.icon" /><span>{{item.name}}</span></span>
                <a-menu-item 
                 v-for="chitem in item.children"
                 :key="chitem.url">
                    {{chitem.name}}
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
        </a-layout-sider>
        <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
            <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
            />
            <a-dropdown>
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                admin<a-icon type="down" />
                </a>
                <a-menu slot="overlay">
                <a-menu-item>
                    <a href="javascript:;"><a-icon type="user" />个人中心</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;"><a-icon type="login" />退出登录</a>
                </a-menu-item>
                </a-menu>
            </a-dropdown>
        </a-layout-header>
        <a-layout style="padding: 0 24px 24px">
            <a-breadcrumb style="margin: 16px 0px;display:flex;">
                <a-breadcrumb-item 
                v-for="(item,index) in breadMenu"
                :key="index">{{item.breadName}}</a-breadcrumb-item>
            </a-breadcrumb>
            <a-layout-content
                :style="{padding: '0px',background: 'rgba(255, 255, 255, 0.2)',minHeight: '280px' }"
            >
            <slot></slot>
            </a-layout-content>
        </a-layout>
        </a-layout>
    </a-layout>
</template>
<script>
export default {
    data() {
        return {
          collapsed: false,
          navMenu:[],//导航栏数据
          breadMenu:[],//面包屑数据
        };
  },
  created () {
      this.breadMenu=[{breadName:'基础数据'},{breadName:'读者信息管理'}]
      this.navMenu = [
          {
              name:'基础数据',
              icon:'container',
              ename:'base',
              children:[
                 {
                     name:'读者信息管理',
                     icon:'user',
                     ename:'readuser',
                     url:'/reader'
                 },{
                     name:'图书信息管理',
                     icon:'book',
                     ename:'book',
                     url:'/book'
                 },{
                     name:'图书类别管理',
                     icon:'calendar',
                     ename:'booktype',
                     url:'/booktype'
                 }
              ]
          },
          {
              name:'图书借阅管理',
              icon:'carry-out',
              ename:'borrowbook',
              children:[
                  {
                      name:'借阅记录',
                      icon:'read',
                      ename:'brolog',
                      url:'/brolog'
                  }
              ]
          },{
              name:'新书订购',
              icon:'money-collect',
              ename:'orderbook',
              children:[
                  {
                      name:'新书订购',
                      icon:'money-collect',
                      ename:'orderbook',
                      url:'/orderbook'
                  },{
                      name:'新书验收',
                      icon:'safety-certificate',
                      ename:'checkbook',
                      url:'/checkbook'
                  }
              ]
          },{
              name:'系统维护',
              icon:'desktop',
              ename:'systemmain',
              children:[
                  {
                      name:'用户管理',
                      icon:'team',
                      ename:'usermanager',
                      url:'/usermanager'
                  },{
                      name:'更改密码',
                      icon:'unlock',
                      ename:'updatepsd',
                      url:'/updatepsd'
                  }
              ]
          }
      ]
  },
  methods: {
      handleClick(item){
        console.log(item);
        if(item.key!==this.$route.path){
            this.$router.push(item.key)
        }
       this.navMenu.map(items=>{
            var data=items.children.filter(item1=>item1.url===item.key)
            //console.log(data);
            if(data.length===1){
                this.breadMenu =[]
                this.breadMenu.push({breadName:items.name})
                this.breadMenu.push({breadName:data[0].name})
            }
        })
      }
  }
}
</script>
<style scoped>
#components-layout-demo-custom-trigger{
    width: 100%;
    height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  position: relative;
  left: 0px;
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.ant-layout ::deep(.ant-layout-content){
    padding: 0px !important;
}
#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.ant-layout-header{
    display: flex !important;
    justify-content: space-between;
}
</style>