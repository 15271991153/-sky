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
                    <a href="javascript:;">1st menu item</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">2nd menu item</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">3rd menu item</a>
                </a-menu-item>
                </a-menu>
            </a-dropdown>
        </a-layout-header>
        <a-layout-content
            :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >
          <slot></slot>
        </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
export default {
    data() {
        return {
          collapsed: false,
          navMenu:[],//导航栏数据
        };
  },
  created () {
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
                      name:'图书借阅',
                      icon:'read',
                      ename:'borrowbook',
                      url:'/borrowbook'
                  },
                  {
                      name:'图书归还',
                      icon:'read',
                      ename:'returnbook',
                      url:'/returnbook'
                  },{
                      name:'图书查询',
                      icon:'read',
                      ename:'querybook',
                      url:'/querybook'
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