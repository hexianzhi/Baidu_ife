# Baidu_ife
存放2016年任务的代码及DEMO 地址，任务总结记录我在每个任务中掌握的知识。

## 任务
### [任务一：零基础HTML编码](https://hexianzhi.github.io/task/task1/task1.html)    

#### 任务总结：了解HTML的定义、概念、发展简史,掌握常用HTML标签的含义、用法,能够基于设计稿来合理规划HTML文档结构,理解语义化，合理地使用HTML标签来构建页面


###  [任务二：零基础HTML及CSS编码（一）](https://hexianzhi.github.io/task/task2/task2.html)

#### 任务总结：针对设计稿样式进行合理的HTML架构，了解CSS的定义、概念、发展简史,掌握CSS选择器的含义和用法,实践并掌握CSS的颜色、字体、背景、边框、盒模型、简单布局等样式的定义方式。

### [任务三：三栏式布局](https://hexianzhi.github.io/task/task3/index_m.html)
> 任务描述：实现三栏式布局。
左右两栏宽度固定，中间一栏根据父元素宽度填充满，最外面的框应理解为浏览器。背景色为 #eee 区域的高度取决于三个子元素中最高的高度。

#### 任务总结：掌握盒模型的概念,掌握position与float的概念以及在布局时的用法


 
###  [任务四：定位和居中问题](https://hexianzhi.github.io/task/task4/task4.html)
 
> 任务描述：灰色元素水平垂直居中，有两个四分之一圆位于其左上角和右下角。

#### 任务总结：深入了解并掌握position等CSS属性。运用flex 布局使得容器居中，再运用 positon 属性放置半圆。

###  [任务五：零基础HTML及CSS编码（二）](https://hexianzhi.github.io/task/task5/task5.html)

> 任务描述：基于第一个任务“零基础HTML编码”的代码，在步骤一的代码基础上增加CSS样式代码的编写。要求：
头部和底部的黑色区域始终是100%宽，
页面右侧部分为固定宽度，左侧保持与浏览器窗口变化同步自适应变化，
左侧的各个模块里面的内容宽度跟随左侧整体宽度同步自适应变化，
10张图片需要永远都完整展现，所以会随着宽度变窄，从两行变成三行甚至更多，也有可能随着宽度变宽，变成一行。

#### 任务总结：
- 第一种方法用的技术点：HTML 中，aside 页面放置于页面结构的起始位置，在 CSS 中运用 position 属性将他放置在右方，剩下的 article 通过设置margin-right 属性来实现间隔并使他呈现出来。 

- 第二种方法是：内容区域放置一个容器中，左边内容运用 float 右边同样，但是，由于 float 属性会脱离正常的文档流，导致内容容器无法正确计算高度，因此底部的 footer 就会上浮到 header 下面。解决方法当然是 清楚浮动！给内容容器设置 overflow:auto 属性值，就可以清楚浮动，进而正确计算高度，错位现象消失。


### [任务六：通过HTML及CSS模拟报纸排版](https://hexianzhi.github.io/task/task6/task6.html)
> 任务描述：参考 PDS设计稿实现页面，准确实现标注图上各字体大小，内外边距样式。

#### 任务总结：深入掌握CSS中的字体，掌握完美实现符合标注中的各项说明的能力。


###  [任务十六：零基础JavaScript编码（四）](https://hexianzhi.github.io/task/task16/task16.html)

#### 任务总结：掌握事件代理机制、掌握简单的表单验证功能（正则表达式）、掌握外部加载JavaScript文件

### [任务十七：零基础JavaScript编码（五）](https://hexianzhi.github.io/task/task17/task17.html)

#### 任务总结： 用DOM实现一个柱状图图表、掌握更加复杂的表单对象、掌握 javascrit 数据处理方法。

### [任务十八：基础JavaScript练习（一）](https://hexianzhi.github.io/task/task18/task18.html)
#### 任务总结：掌握 js 数组常用API。


### [任务十九：基础JavaScript练习（二）](https://hexianzhi.github.io/task/task19/task19.html)
#### 任务总结：用 js 实现常用的排序算法

### [任务二十：基础JavaScript练习（三）](https://hexianzhi.github.io/task/task20/task20.html)
#### 任务总结：掌握数组常用 api

### [任务二十一：基础JavaScript练习（四）](https://hexianzhi.github.io/task/task21/task21.html)

#### 任务总结： 掌握 JavaScript 常用事件知识、掌握用JavaScript实现面向对象编程。


### [任务二十二：JavaScript和树（一）](https://hexianzhi.github.io/task/task22/task22.html)

#### 任务总结： 用 JavaScript 树的三种遍历方式，掌握 JavaScript 延时函数。

### [任务三十：表单（二）多个表单项的动态校验](https://hexianzhi.github.io/task/task30/task30.html)

#### 任务总结：熟悉常用表单处理逻辑、踩了闭包的坑并用匿名函数解决之、踩了 JavaScript 事件处理的坑看书找到方法解决之。

### [任务三十：表单（三）联动](https://hexianzhi.github.io/task/task31/task31.html)

#### 任务总结：掌握html 中注册表单改变事件的方法（onchange）、进一步熟悉表单的重要属性降低代码复杂度。
 
 
### [任务三十七：UI组件之浮出层](https://hexianzhi.github.io/task/task37/task37.html)

#### 任务总结：使用 js 实现浮出层。
 
### [任务三十八：UI组件之排序表格](https://hexianzhi.github.io/task/task38/task38.html)

#### 任务总结：使用 js 实现排序表格。
