---
title: Hexo-search配置
date: 2019-03-24 13:42:18
tags: Hexo
categories: 
---

[官方文档](https://github.com/wzpan/hexo-generator-search)

# 安装插件
```bash
$ npm install hexo-generator-search --save
```
---
# 配置文件
修改在根目录下的_config.yml
```
search:
  path: search.xml 
  field: all 
  content: true
```
<!-- more -->
* path - 文件的路径。默认是 search.xml。如果文件扩展名为 .json,则输出格式为JSON。
* field - 要搜索的搜索范围：
*   post (Default) -  仅涵盖您博客的所有帖子。
*   page - 仅涵盖您博客的所有页面。
*   all - 将涵盖您博客的所有帖子和页面。
* content - 是否包含每篇文章的全部内容。如果false，生成的结果仅覆盖没有主体的标题和其他元信息。默认是true。
---
# 排除索引
在文章顶部配置里加入 indexing: false 
