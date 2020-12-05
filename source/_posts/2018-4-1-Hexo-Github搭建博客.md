---
title: Hexo-Github搭建博客
date: 2018-04-01 21:46:52
tags: Hexo
---

此篇用以记录使用`Hexo`搭建博客的过程，不时修改加以完善。

<!-- more -->

# 一、 准备环境

## 1. Github账户

注册并新建项目，项目必须要遵守格式：`YOUR_NAME.github.io`

## 2. 安装[Git](https://git-scm.com/downloads)

- Windows：下载并安装 [git](https://git-scm.com/download/win).
- 还可以前往 [淘宝 Git for Windows 镜像](https://npm.taobao.org/mirrors/git-for-windows/)
- [更多参见](https://hexo.io/zh-cn/docs/#%E5%AE%89%E8%A3%85-Git)


### 配置好Git环境

```bash
git config --global user.name "your_name"
git config --global user.email "your_email"
git config --global core.autocrlf false
```

<details>
<summary>CRLF问题(折叠)</summary>
<blockquote>
	首先问题出在不同操作系统所使用的换行符是不一样的，下面罗列一下三大主流操作系统的换行符：
	Uinx/Linux采用换行符LF表示下一行（LF：LineFeed，中文意思是换行）；
	Dos和Windows采用回车+换行CRLF表示下一行（CRLF：CarriageReturn LineFeed，中文意思是回车换行）；
	Mac OS采用回车CR表示下一行（CR：CarriageReturn，中文意思是回车）。
	为true时，Git会将你add的所有文件视为文本问价你，将结尾的CRLF转换为LF，而checkout时会再将文件的LF格式转为CRLF格式。
	为false时，line endings不做任何改变，文本文件保持其原来的样子。
	为input时，add时Git会把CRLF转换为LF，而check时仍旧为LF，所以Windows操作系统不建议设置此值。
</blockquote>
</details>

### 创建ssh密钥，将公钥上传

```bash
ssh-keygen -t rsa -b 4096 -C "your_email" 	# 创建密钥对
ssh -T git@github.com  						# 测试添加ssh是否成功
```

- 更多参见[Github](https://help.github.com/cn/github/authenticating-to-github/connecting-to-github-with-ssh)

## 3. 安装[Node.js](https://nodejs.org/en/download/)

- Node.js 为大多数平台提供了官方的 [安装程序](https://nodejs.org/en/download/)。
- 对于中国大陆地区用户，可以前往 [淘宝 Node.js 镜像](https://npm.taobao.org/mirrors/node) 下载。
- 更多参见[Hexo](https://hexo.io/zh-cn/docs/#%E5%AE%89%E8%A3%85-Node-js)

## 4. 安装[Hexo](https://hexo.io/)

使用 npm 安装 Hexo。

```bash
npm install hexo-cli -g
hexo -v 				# 检查hexo是否安装成功
```

- 更多参见[Hexo](https://hexo.io/zh-cn/docs/#%E5%AE%89%E8%A3%85-Hexo)

# 二、 本地博客 - Fighting

## 1. 初始化博客

执行下列命令，Hexo 将会在指定文件夹中新建所需要的文件。

```bash
hexo init [folder]
cd [folder]
npm install				# 安装所需要的组件
hexo g					# 生成静态文件--public文件夹下
```

- 更多参见[Hexo](https://hexo.io/zh-cn/docs/setup)

## 2. 开启本地服务

```bash
hexo server
hexo s -p 端口号			# 重设端口
hexo s -s 				#只使用静态文件
```

## 3. 写篇文章

```bash
hexo new [layout] <title>
hexo n -p <path> 			# 自定义新文章的路径
```

## 4. 文件生成

```bash
hexo generate
hexo g -d 		# 文件生成后立即部署网站
hexo g -f 		# 差分机制，只会重新生成改动的文件
```

## 5. 写篇草稿

### 1). 新建草稿

执行以下命令将在`./source/_drafts`文件夹下创建一篇博文。

```bash
hexo new draft <filename>
```

### 2). 预览草稿

预览草稿有两种方式

{% tabs 预览草稿, 1 %}

<!-- tab 命令 -->
显示草稿的命令需要附带参数`--draft`，所以可以执行以下命令

```bash
hexo server --draft
```
<!-- endtab -->

<!-- tab 更改配置 -->
在配置文件中更改
```bash ./_config.yml
render_drafts: true
```
<!-- endtab -->

{% endtabs %}

### 3). 发表草稿
把草稿变成文章，或者页面：

```bash 
hexo publish [layout] <filename>
```

## 6. 其他操作

### 1). 渲染文件

```bash 
hexo render <file1> [file2] ...
```

### 2). 清除文件

清除缓存文件 (`db.json`) 和已生成的静态文件 (`public`)。

```bash
hexo clean
hexo cl
```

- 更多参见[Hexo](https://hexo.io/zh-cn/docs/commands)

# 三、 推送到GitHub

## 1. 配置文件

打开`_config.yml`文件，修改repo值（在末尾）

> 注：所有配置项目的分号后都需要一个空格

```bash ./_config.yml
deploy:
	type: git
	repo: git@github.com:YOUR_NAME/YOUR_NAME.github.io.git
	branch: master
```

## 2. 生成并部署文章

生成以及部署文章之前，需要安装一个扩展

```bash
npm install hexo-deployer-git --save
```

在`_posts`目录下新建一篇博文，编辑器编好文章，那么就可以生成以及部署了

```bash
hexo new post "博文名"  #  _posts目录下新建一篇博文
hexo d -g               #  生成以及部署
```



# 四、 迁移方法

## RSS

安装`hexo-migrator-rss`插件

```bash
npm install hexo-migrator-rss --save
```

执行 (`<source>` 文件路径或网址)

```bash
hexo migrate rss <source>
```

- 更多参见[Hexo](https://hexo.io/zh-cn/docs/migration)



# 五、 其他部署

除了推送到`Github`，也可以使用其他平台，比如`Gitee`和`Coding`。实践出真知，可以多尝试。

{% note warning no-icon %}
对于`Gitee`和`Coding`用了一段时间，都有所限制：
- Gitee：速度尚可，但是自定义域名需要付费，即使可以免费使用几个月，我还是弃了
- Coding：速度挺好，但是在我使用的那段时间隔三岔五访问不了
{% endnote %}


## Fast.io
[Fast](https://fast.io/)支持网盘 `Google Drive` / `OneDrive` / `Github` / `Dropbox` / `MediaFire` / `BOX`。如此获取网盘资源外链，图床不是问题。但也有~~（可忽略的）~~限制，如下：
- 免费创建5个站点
- 单个文件最大500M
- 每个月100G流量	

## Js.org
使用[Js.org](https://js.org/)和自定义域名类似，将一个名为“CNAME”的文件添加到您的存储库中，然后在GitHub [repository ](https://github.com/js-org/js.org/tree/master)中发出拉取请求，该请求会将子域添加到现有JS.ORG域的列表中。

## Firebase Hosting
[Firebase](https://console.firebase.google.com/)是一个把后端作为服务的云平台（BaaS）
- 国内无法访问。

## FTP服务器

- 安装插件

```bash
# 使用淘宝镜像CNPM安装插件
npm install -g cnpm --registry=https://registry.npm.taobao.org
npm install hexo-deployer-ftpsync –save
```

- 修改配置

修改`_config.yml`文件:

```bash
deploy:
- type: ftpsync                 #上传方式，固定ftpsync
  host: hfanss.ftp-gz01.com     #ftp地址
  user: ****                    #帐号
  pass: ****                    #密码
  remote: /webroot/             #上传至哪个目录
  port: 8010                    #端口
```

## 腾讯云COS

- 安装插件

```bash
npm install hexo-deployer-cos --save
```

- 修改配置

修改`_config.yml`文件:

```bash
deploy:
- type: cos             # 上传方式，固定cos
  appId: 12529*****     # cos的appId
  secretId: AKI******   # cos的secretId
  secretKey: **********	# cos的secretKey
  bucket: *********     # cos的bucket
  region: ap-shanghai   # cos的region
```

## 其他平台

- [Heroku](https://heroku.com)
- [vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [Bitbucket](https://bitbucket.org/)
- [aerobatic](https://www.aerobatic.com/)
- [surge](https://www.nssurge.com/)
- [atlassian](https://www.atlassian.com/)
- [GitLab](https://gitlab.com/)

代码托管
- [code.aliyun](https://code.aliyun.com/)
- [oschina](https://www.oschina.net/)
- [京东代码库](https://code.jd.com/)
- [gitshell](https://gitshell.com/)
- [gitea](https://gitea.com/)

# 六、更新

更新`npm`
```
npm install -g npm
```
更新`Next`主题(hexo >= 5.0)
```
npm install hexo-theme-next@latest
```

`npm outdated`以查看所有可升级的插件

使用`npm-check`检查更新
```
npm install -g npm-check
npm-check
npm-check --skip-unused
npm-check -u
```

- [Hexo 升级至 5.0 版](https://www.jianshu.com/p/98ac1e253e6e)
- [Hexo版本升级和Next主题升级之坑](https://blog.csdn.net/whjkm/article/details/81088518)
- [将 Hexo 升级到 v4.2.1](https://zhuanlan.zhihu.com/p/157511323)

# 其他相关阅读

[简书-hexo使用grunt实现自动化](https://www.jianshu.com/p/cf6d7a180aa4)