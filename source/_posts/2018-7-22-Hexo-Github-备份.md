---
title: Hexo-Github-备份
date: 2018-07-22 15:59:55
tags: [Hexo,hide]
categories: 
---


用Hexo在GitHub搭建Blog后想要进行备份，方法之一就是通过创建分支把源码放到GitHub上。

# 一、 需要备份的文件

## 1、 文章

./source 文件夹，这个就不用说了，这里面包含了你写的文章的 markdown 源码，这个是最重要的。
	
## 2、 配置文件

根目录下的几个配置文件，主要是 _config.yml、 package.json、 .gitignore。
<!-- more -->
	
## 3、 主题文件夹

./themes/themes_name 这里的 themes_name 指的是你的主题名称， 如果咱对主题进行了一些个性化的配置， 那么这个主题也最好全部备份。
	
## 4、 模版

./scaffolds 文件夹， 这个文件夹里是创建文	章时的模板， 如果没修改过这个文件夹中的东西， 可以不用备份。
	
## 5、 密钥

.ssh， 咱认为没必要备份，直接放到GitHub不安全，大不了重新生成嘛。

# 二、 创建分支

创建GitHub Pages 时咱创建了两个分支：master 与 hexo

- master 分支用来存放生成的静态网页
- hexo 分支用来存放网站的原始文件
		
```bash
$ git add .
$ git status
$ git commit -m '...'
$ git push --set-upstream origin hexo
```
	
```bash
## 另附：
$ git branch -a 		# 查看远程分支
$ git branch 			# 查看本地分支
$ git checkout master 	# 切换分支
```
	
	
# 三、 推送到分支

创建GitHub Pages 时创建两个分支：master 与 hexo
设置hexo 为默认分支，修改_config.yml中的deploy参数， 分支应为master；
依次执行
```bash
$ git add . 
$ git commit -m “…”
$ git push –set-upstream origin hexo
```
提交原始文件到Hexo

# 四、 修改日常！

依次执行
```bash
$ git add .
$ git commit -m '...'
$ git push origin hexo 
```
指令将改动推送到GitHub（此时当前分支应为hexo）；
然后执行
```bash
$ hexo g -d
```
会发布网站到master分支上。另外，两个过程顺序调转一般不会有问题。

# 五、 如何恢复

当重装电脑之后，或者想在其他电脑上修改博客，可以使用下列步骤：
	
```bash
$ git clone -b hexo git@github.com:YOURNAME/YOURNAME.github.io.git
# 在本地新拷贝的YOURNAME.github.io文件夹下通过Git 	bash依次执行下列指令：
$ npm install hexo
$ npm install
$ npm install hexo-deployer-git
（记得，不需要hexo init这条指令）。
```

# 六、 参考文档：
	(GitHub Pages + Hexo搭建博客)[http://crazymilk.github.io/2015/12/28/GitHub-Pages-Hexo%E6%90%AD%E5%BB%BA%E5%8D%9A%E5%AE%A2/#more]
	[使用hexo，如果换了电脑怎么更新博客？(知乎)](https://www.zhihu.com/question/21193762)

