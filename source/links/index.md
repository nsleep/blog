---
title: 友情链接
type: "links"
categories: links
comments: true
date: 2020-03-03 19:05:35
---

<style>#links{margin-top:60px}.links-content{margin-top:1rem}.links-content .mdui-panel-gapless,.links-content .mdui-panel-item{-webkit-box-shadow:none!important;box-shadow:none!important}.links-content .mdui-panel-item .note{margin:0}.link-navigation{margin-top:15px}.link-navigation:after{content:" ";display:block;clear:both}.card{width:300px;height:64px;font-size:1rem;padding:10px 20px;border-radius:4px;transition:.4s;margin-bottom:1rem;display:block;-webkit-box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.card:nth-child(odd){float:left}.card:nth-child(2n){float:right}.card:hover{transform:scale(1.1);-webkit-box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.card a{border:none;display:inline-flex}.card .ava{width:4rem!important;height:4rem!important;margin:0 1em 0 0!important;border-radius:4px;display:inline}.card .card-header{font-style:italic;overflow:hidden;width:236px;padding-left:10px}.card .link{font-style:normal;color:#2bbc8a;font-weight:700;text-decoration:none}.card .link:hover{color:#d480aa;text-decoration:none}.card .card-header .info{font-style:normal;color:#a3a3a3;font-size:14px;min-width:0;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.squareCard{margin:5px 10px!important;padding:3px!important;border-radius:3px;overflow:hidden;float:left;width:145px;position:relative;min-height:1px;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:2px;-webkit-box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);-webkit-transition:-webkit-box-shadow .25s cubic-bezier(.4,0,.2,1);transition:-webkit-box-shadow .25s cubic-bezier(.4,0,.2,1);transition:box-shadow .25s cubic-bezier(.4,0,.2,1);transition:box-shadow .25s cubic-bezier(.4,0,.2,1),-webkit-box-shadow .25s cubic-bezier(.4,0,.2,1);will-change:box-shadow;transition:all .3s}.squareCard:hover{-webkit-box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);opacity:.8}@media (max-width:600px){.squareCard{float:left}}.squareCard:before{position:absolute;content:"";left:-100px;bottom:-63px;width:50px;height:277px;background:#fff;-webkit-transition:transform .5s ease;transition:transform .5s ease;-webkit-transform:translateX(-50px) rotate(45deg);transform:translateX(-50px) rotate(45deg);z-index:99999}.squareCard:hover:before{-webkit-transform:translateX(360px) rotate(45deg);transform:translateX(360px) rotate(45deg)}.squareCard a{position:relative;display:inline-block;overflow:hidden;color:#ff4081;text-decoration:none;vertical-align:top;outline:0}.squareCard img{margin:0!important;padding:0!important;width:10rem;height:8.7rem;background-color:#f0f8ff;object-fit:contain}.squareCard .card-header{width:100%;border-bottom-left-radius:3px;border-bottom-right-radius:3px;overflow:hidden;background:rgba(0,0,0,.3);z-index:3;position:absolute;right:0;bottom:0;min-height:48px;max-height:68px;box-sizing:border-box;padding:5px;color:#fff;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.squareCard .card-header div:first-of-type{height:20px;text-align:left;overflow:hidden;font-size:16px;line-height:16px;text-overflow:ellipsis;white-space:nowrap;transition:all .3s}.squareCard .card-header .info{height:18px;margin-top:4px;overflow:hidden;font-size:12px;line-height:18px;text-overflow:ellipsis;white-space:nowrap;opacity:1}</style>
{% block content %}
  {######################}
  {### LINKS BLOCK ###}
  {######################}
    
    <!-- 引入样式 -->
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <!-- 引入组件库 -->
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <!-- 引入MDUI -->
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/mdui/0.4.3/css/mdui.min.css">
    <script src="//cdnjs.cloudflare.com/ajax/libs/mdui/0.4.3/js/mdui.min.js"></script>
    <!-- 引入Mystyle样式 -->
    <link rel="stylesheet" href="/css/mystyle.css">
        
    <div id="links">
        <el-tooltip :content=" '当前样式: ' + value " placement="top">
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949"
              
              active-value="default"
              inactive-value="square"
              @change = changeStyleClass>
            </el-switch>
        </el-tooltip>
          
        <div class="links-content">
        
        <div class="mdui-panel mdui-panel-gapless " mdui-panel="{accordion: false}">
            
            <div class="mdui-panel-item mdui-panel-item-open">
                <div class="mdui-panel-item-header no-icon note warning">
                    <div class="link-info">👨‍🎓 跟着大佬走，成为小大佬</div>
                    <i class="mdui-panel-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
                </div>
                
                <div class="mdui-panel-item-body link-navigation">
                
                    {% for link in site.data.links.defaultlinks  %}

                        <div class="card">
                            <a class="link" href="{{ link.site }}" target="_blank">
                            <el-avatar {% if site.data.links.shape === 'square' %} shape="square" {% else %} shape="circle" {% endif %}
                                :size="60" 
                                fit="contain"
                                src="{% if link.avatar !== '' %}{{ link.avatar }}{% endif %}" 
                                @error="errorHandler">
                                
                                  <img class="ava" src="{{ site.data.links.defaultPic }}"/>
                            </el-avatar>
                            
                                <div class="card-header">
                                    <div>{{ link.nickname }}</div>
                                    <div class="info">{{ link.info }}</div>
                                </div>
                            </a>
                        </div>

                    {% endfor %}

                </div>
            </div>
            
            <div class="mdui-panel-item mdui-panel-item-open">
                <div class="mdui-panel-item-header no-icon note primary">
                    <div class="link-info">🍭 五湖四海的朋友们</div>
                    <i class="mdui-panel-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
                </div>
                <div class="mdui-panel-item-body link-navigation">
                
                    {% for link in site.data.links.friendslinks  %}
                
                        <div class="card">
                            <a class="link" href="{{ link.site }}" target="_blank">
                            <el-avatar {% if site.data.links.shape === 'square' %} shape="square" {% else %} shape="circle" {% endif %}
                                :size="60" 
                                fit="contain"
                                src="{% if link.avatar !== '' %}{{ link.avatar }}{% endif %}" 
                                @error="errorHandler">
                                
                                  <img class="ava" src="{{ site.data.links.defaultPic }}"/>
                            </el-avatar>
                            
                                <div class="card-header">
                                    <div>{{ link.nickname }}</div>
                                    <div class="info">{{ link.info }}</div>
                                </div>
                            </a>
                        </div>
                
                    {% endfor %}
                
                </div>
            </div>
        </div>
        {{ page.content }}
        </div>
    </div>

<script>
new Vue({
    el: '#links',
    data: function() {
        return { 
            value: 'default',
            circleUrl: "/static/images/default.png"
        }
    },
    methods:{
        changeStyleClass: function(callback){
            console.log(callback)
            if(callback !== 'square'){
                if($('div').hasClass('squareCard')){
                    var l = $(".squareCard").length;
                    for (var i=0;i < l;i++){
                        $(".squareCard>a>span")[0].classList.toggle('el-avatar');
                        $(".squareCard>a>span")[0].classList.toggle('el-avatar--square');
                        
                        $(".squareCard")[0].classList.replace('squareCard','card');
                    }
                }
            }else{
                if($('div').hasClass('card')){
                    var l = $(".card").length;
                    for (var i=0;i < l;i++){
                        $(".card>a>span")[0].classList.toggle('el-avatar');
                        $(".card>a>span")[0].classList.toggle('el-avatar--square');
                        
                        $(".card")[0].classList.replace('card','squareCard');
                        
                    }
                }
            }
        },
        errorHandler() {
            return true
        }
    }
})
</script>
<script>
var cards = document.getElementsByClassName("card");
for (var i=0;i<cards.length;i++){
    cards[i].onclick = function(){
        this.firstElementChild.click();
    }
}
</script>
  {##########################}
  {### END LINKS BLOCK ###}
  {##########################}
{% endblock %}


---

### 友链声明：
1、本站会定期清理无法访问的友链，如果更换了链接信息请至评论区留言，谢谢合作！
2、本站会定期查看双方是否互为友链，如果取消本站友链，本站也会将您的友链移除

### 申请要求：
1、内容持续更新且可以稳定访问
2、网页整洁无繁杂广告推广
3、头像能够快速加载

### 申请方式：
按照以下格式发送至[邮箱](mailto:simoncq@163.com)

[^_^]: 先将本站的友链添加到您的友链，相关信息如下
[^_^]: 然后按照以下格式在本站留言区留言，待博主为您添上友链

{% note success no-icon %}
名称：Simon's Blog 
主页：https://iblog.simon7.top/ 
头像：https://iblog.simon7.top/static/images/avatar.png
说明：一花一世界，一叶一菩提
{% endnote %}

