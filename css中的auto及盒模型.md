<!--
 * @Author: your name
 * @Date: 2020-05-07 17:14:22
 * @LastEditTime: 2020-05-07 17:18:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myCode/Interview-Tips/css中的auto及盒模型.md
 -->
 根据CSS规范:

> ‘margin-left’ + ‘border-left-width’ + ‘padding-left’ + ‘width’ + ‘padding-right’ + ‘border-right-width’ + ‘margin-right’ = 块的宽度

当一个元素的宽度值为 **auto** 时，它包含margin、padding和border，**不会变得比它的父元素大**。其中 content 的宽度将是**content**本身减去**margin、padding和border**。
