---
title: Python路径操作新标准：pathlib 模块
date: 2020-12-09 16:07:38
tags:
categories:
---

[pathlib 模块](https://www.cnblogs.com/nickchen121/p/11596223.html)
[官方的回答](https://docs.python.org/zh-cn/3/library/pathlib.html)
<!-- more -->

获取当前路径

os.getcwd()

pathlib.Path.cwd()


获取父目录

os.path.dirname(os.getcwd())

str(pathlib.Path.cwd().parent)

拼接路径

os.path.join(os.getcwd(), 'a', 'b')

paths = ('a', 'b')
pathlib.Path.cwd().joinpath(*paths)
