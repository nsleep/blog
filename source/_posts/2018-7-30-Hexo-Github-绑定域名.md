---
title: Hexo-Github-绑定域名
date: 2018-07-30 01:23:48
tags: Hexo
---

## 1. ~~获取GitHub Pages的IP~~

~~Ping出Github Pages的IP~~ `(解析时没有用到IP地址)`
```bash
$ ping YOURNAME.github.io
```

## 2. 配置域名

在目录 YOURNAME\source 下创建一个名为CNAME的文件，文件的内容是你的二级域名
 `例如：blog.xxxx.com` 。


## 3. 域名解析

拿二级域名`blog.xxxx.com`举例，记录类型置为CNAME，主机记录置为 `blog.xxxx.com` 中的 `blog` ，记录值置为 `YOURNAME.githob.io`

[^_^]: # (我是注释，不会在浏览器中显示。)

修改的时候只要修改两个记录类型为A，主机记录分别为@和www的行就可以了

<!-- more -->


