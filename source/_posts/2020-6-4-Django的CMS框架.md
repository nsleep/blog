---
title: Django的CMS框架
date: 2020-06-04 06:13:24
tags:
  - Django
  - blog
categories:
---


> Mezzanine 是一个功能强大，一致且灵活的内容管理平台。Mezzanine 使用Django框架构建，提供了一个简单但高度可扩展的体系结构。

- [On GitHub](https://github.com/stephenmcd/mezzanine/)
- [官方网站](http://mezzanine.jupo.org/)
- [开发文档](http://mezzanine.jupo.org/docs/overview.html)

<!-- more -->

- [我的项目地址](https://github.com/nsleep/mblog)
- [我的演示](https://simon-mblog.herokuapp.com/)

# 一、 开始

环境：`python3`

## 1. 安装

```bash
pip install mezzanine
```

## 2. 创建项目

```bash
mezzanine-project project_name
cd project_name
python manage.py createdb --noinput
python manage.py runserver
```

{% note info  %}
该`createdb`命令是使用Django命令的快捷方式 `migrate`，该命令还将安装一些演示内容，例如联系表格，图片库等。如果您想省略此步骤，请将该`--nodata`选项与`createdb`一起使用。
{% endnote %}

## 3. 静态文件

对于静态文件（包括JavaScript和CSS文件等），官方是这样解释的

> Django在生产环境中部署时不提供静态内容，而将其留给面向公众的Web服务器，这绝对是完成此工作的最佳工具。

这时静态文件在（虚拟）环境下`\Lib\site-packages\mezzanine\core\static`，执行下列命令可以将文件直接存储在项目中

```bash
python manage.py collectstatic
python manage.py collecttemplates
```



## 4. 主题

[主题](http://mezzanine.jupo.org/docs/overview.html#themes)

## 5. 第三方插件

[第三方插件](http://mezzanine.jupo.org/docs/overview.html#third-party-plug-ins)

## 6. 示例站点

[示例站点](http://mezzanine.jupo.org/docs/overview.html#sites-using-mezzanine)

## 7. 常见问题

[常见问题](http://mezzanine.jupo.org/docs/frequently-asked-questions.html#templates)

