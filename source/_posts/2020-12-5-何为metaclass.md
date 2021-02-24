---
title: 何为metaclass
date: 2020-12-05 15:20:32
tags:
categories:
---

## 什么是 metaclass ？

metaclass 意为 元类 超类，可以对子类进行操作，就像装饰器那样可以动态定制和修改被装饰的类，metaclass 可以动态的定制或修改继承它的子类。

<!-- more -->

## metaclass 能解决什么问题？

只需要实现一个 metaclass 超类，然后再实现一个子类继承这个 metaclass，就可以根据不同的配置文件自动拉取不同的类，这极大地提高了效率。

## 一个实例

```python
In[15]: class Mymeta(type):
   ...:     def __init__(self, name, bases, dic):
   ...:         super().__init__(name, bases, dic)
   ...:         print('===>Mymeta.__init__')
   ...:         print(self.__name__)
   ...:         print(dic)
   ...:         print(self.yaml_tag)
   ...: 
   ...:     def __new__(cls, *args, **kwargs):
   ...:         print('===>Mymeta.__new__')
   ...:         print(cls.__name__)
   ...:         return type.__new__(cls, *args, **kwargs)
   ...: 
   ...:     def __call__(cls, *args, **kwargs):
   ...:         print('===>Mymeta.__call__')
   ...:         obj = cls.__new__(cls)
   ...:         cls.__init__(cls, *args, **kwargs)
   ...:         return obj
   ...: 
In[16]: 
In[16]: 
In[16]: class Foo(metaclass=Mymeta):
   ...:     yaml_tag = '!Foo'
   ...: 
   ...:     def __init__(self, name):
   ...:         print('Foo.__init__')
   ...:         self.name = name
   ...: 
   ...:     def __new__(cls, *args, **kwargs):
   ...:         print('Foo.__new__')
   ...:         return object.__new__(cls)
   ...:     
===>Mymeta.__new__
Mymeta
===>Mymeta.__init__
Foo
{'__module__': '__main__', '__qualname__': 'Foo', 'yaml_tag': '!Foo', '__init__': <function Foo.__init__ at 0x0000000007EF3828>, '__new__': <function Foo.__new__ at 0x0000000007EF3558>}
!Foo

In[17]: foo = Foo('foo')
===>Mymeta.__call__
Foo.__new__
Foo.__init__

```

从上面的运行结果可以发现在定义 class Foo() 时，会依次调用 MyMeta 的 `__new__` 和 `__init__` 方法构建 Foo 类，然后在调用 foo = Foo() 创建类的实例对象时，才会调用 MyMeta 的 `__call__` 方法来调用 Foo 类的 `__new__` 和 `__init__` 方法。

把上面的例子运行完之后就会明白很多了，正常情况下我们在父类中是不能对子类的属性进行操作，但是元类可以。换种方式理解：元类、装饰器、类装饰器都可以归为元编程。

## 底层是如何实现 metaclass 的？

第一，所有的 Python 的用户定义类，都是 type 这个类的实例。
第二，用户自定义类，只不过是 type 类的 `__call__` 运算符重载
第三，metaclass 是 type 的子类，通过替换 type 的 `__call__` 运算符重载机制，“超越变形”正常的类
