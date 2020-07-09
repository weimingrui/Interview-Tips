纯函数,虚函数，高阶函数，自执行函数（立即执行函数），匿名函数
多态，继承，重载
五大设计原则
　　　　　　// S - 单一职责原则
　　　　　　　　//一个程序只做好一件事
　　　　　　　　//如果功能过于复杂就拆分开，每个部分保持独立
　　　　　　// O - 开放封闭原则
　　　　　　　　//对扩展开放，对修改封闭
　　　　　　　　//增加需求时，扩展新代码，而非修改已有代码
　　　　　　// L - 李氏置换原则
　　　　　　　　//子类能覆盖父类
　　　　　　　　//父类能出现的地方子类就能出现
　　　　　　　　//js中使用较少（弱类型&继承使用较少）
　　　　　　// I - 接口独立原则
　　　　　　　　//保持接口的单一独立，避免出现“胖接口”
　　　　　　　　//js中没有接口（typescript例外），使用较少
　　　　　　// D - 依赖倒置原则
　　　　　　　　//面向接口编程，依赖于抽象而不依赖具体
　　　　　　　　//使用方只关注接口而不关注具体类的实现
　　　　　　　　//js中使用较少（没有接口&弱类型）

柯里化，英语：Currying(果然是满满的英译中的既视感)，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
优点，缺点：
// 普通的add函数
function add(x, y) {
    return x + y
}

// Currying后
function curryingAdd(x) {
    return function (y) {
        return x + y
    }
}

add(1, 2)           // 3
curryingAdd(1)(2)   // 3

ES5 开始可以用 Object.create(null) 来创建一个没有原型的对象，但是这种用法不太常见。

摇树优化 tree shaking

Contenteditable  true|false ，继承父元素的值


简单粗暴的React Diff算法将传统O(n^3)Diff算法的时间复杂度降为O(n):
1. Diff算法 => O(n^3) => 将两个DOM树的所有节点两两对比，时间复杂度 O(n^2)
   prev                   last   

      A                       A
     /   \                    /   \
   D    B     =>       B    D
  /                                  \
C                                   C

  所有节点两两相互对比：
  pA => lA
  pA => lB
  pA => lD
  pA => lC
  ...
  pC => lC

再进行树的编辑(插入、替换、删除)需要遍历一次，因此时间复杂度为 O(n^3)


2. React Diff算法 => O(n) => 简单粗暴，所有的节点按层级比较，只会遍历一次

 # 按叶子节点位置比较
 [0,0]              :  pA => lA      #相同，不理会
 [0.0,0.0]        :  pD => lB      #不同，删除pD，添加lB
 [0.1,0.1]        :  pB => lD      #不同，删除pB，添加lD
 [0.1.0,0.1.0]  :  pC => Null   #last树没有该节点，直接删除pC
 [0.1.2,0.1.2]  :  Null => lC    #prev树没有该节点，添加lC到该位置
 
React认为：一个ReactElement的type不同，那么内容基本不会复用，所以直接删除节点，
                    添加新节点，这是一个非常大的优化，大大减少了对比时间复杂度。

HTTP状态码
1**	信息，服务器收到请求，需要请求者继续执行操作
2**	成功，操作被成功接收并处理
3**	重定向，需要进一步的操作以完成请求
4**	客户端错误，请求包含语法错误或无法完成请求
5**	服务器错误，服务器在处理请求的过程中发生了错误



压缩思路
涉及到 JS 的图片压缩，需要用到 Canvas 的绘图能力，通过调整图片的分辨率或者绘图质量来达到图片压缩的效果，实现思路如下：

获取上传 Input 中的图片对象 File
将图片转换成 base64 格式
base64 编码的图片通过 Canvas 转换压缩，这里会用到的 Canvas 的 drawImage 以及 toDataURL 这两个 Api，一个调节图片的分辨率的，一个是调节图片压缩质量并且输出的，后续会有详细介绍
转换后的图片生成对应的新图片，然后输出

(4).判断是否是数组

1.Array.isArray(arr)
2.Object.prototype.toString.call(arr) === '[object Array]'
3.arr instanceof Array
4.array.constructor === Array

string转数字
1.转换函数， parseInt,praseFloat
2.强制类型转化，Number
3.利用js变量弱类型转换，+ '0.123'

**加载**

(1).异步加载js的方法

defer：只支持IE如果您的脚本不会改变文档的内容，可将 defer 属性加入到\<script\/>标签中，以便加快处理文档的速度。因为浏览器知道它将能够安全地读取文档的剩余部分而不用执行脚本，它将推迟对脚本的解释，直到文档已经显示给用户为止。

async：HTML5 属性，仅适用于外部脚本；并且如果在IE中，同时存在defer和async，那么defer的优先级比较高；脚本将在页面完成时执行。

> 如果 async="async"：脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行
如果不使用 async 且 defer="defer"：脚本将在页面完成解析时执行
如果既不使用 async 也不使用 defer：在浏览器继续解析页面之前，立即读取并执行脚本
(2).图片的懒加载和预加载

预加载：提前加载图片，当用户需要查看时可直接从本地缓存中渲染。
懒加载：懒加载的主要目的是作为服务器前端的优化，减少请求数或延迟请求数。

两种技术的本质：两者的行为是相反的，一个是提前加载，一个是迟缓甚至不加载。懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力。

JS中通过var定义全局变量与在window对象上直接定义属性的区别
1.全局变量不能通过delete删除，而window属性上定义的变量可以通过delete删除
2.尝试访问未声明的变量会报错，xxx is not defined。但是通过查询window查询，可以知道某个可能未声明的变量是否存在，不会报错，只会显示undefined。（这一点可以用预编译解释，var声明的变量会提升声明到顶部）
3.在函数中使用var定义的变量是局部变量。有时想要在外部也访问到函数里面的变量，就需要定义window对象属性

浏览器核心
Trident(IE内核) Gecko(Firefox内核) Presto(Opera前内核) (已废弃) Webkit(Safari内核,Chrome内核原型,开源) Blink是一个由Google和Opera Software开发的浏览器排版引擎，Google计划将这个渲染引擎作为Chromium计划的一部分


**<base\/>** 标签，重定向html文件里的相对路径，省略相对地址也可显示

substring(startIndex,endIndex),substr(startIndex,stringLength)

在转换不同的数据类型时，相等操作符遵循下列基本规则：

1. 如果有一个操作数是布尔值，则在比较相等性之前，将其转换为数值；

2. 如果一个操作数是字符串，另一个操作数是数值，在比较之前先将字符串转换为数值；

3. 如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf() 方法，用得到的基本类型值按照前面的规则进行比较；

4. 如果有一个操作数是 NaN，无论另一个操作数是什么，相等操作符都返回 false；

5. 如果两个操作数都是对象，则比较它们是不是同一个对象。如果指向同一个对象，则相等操作符返回 true；

6. 在比较相等性之前，不能将 null 和 undefined 转成其他值。

7. null 和 undefined 是相等的。

上面阐述的 1、2、3 三条规则，总结成一句话就是：

如果相等操作符两边的操作数，不包含 null 或者 undefined，且两个操作数不全是对象，

在执行相等比较之前，会先调用 Number() 将两个操作数强制转为 Number 类型，然后进行比较;

在 JavaScript 中，Object、Array、Function、RegExp、Date 都是引用类型

声明引用类型的时候，变量名保存在 js 的栈内存里面，而对应的值保存在堆内存里面

而这个变量在栈内存中实际保存的是：这个值在堆内存中的地址，也就是指针.


判断数据类型
typeof()，instanceof，Object.prototype.toString.call()


1.防抖节流
(1).节流
在 n 秒内只会执行一次，所以节流会稀释函数的执行频率

(2). 防抖
按最后一次算。比如说“停止输入5s后才发送请求”

数组去重
array.filter 
1 双重循环

2 indexOf去重

3 Map
Map.has(a)&&Map.set(a,1)

4 new Set(array)
Array.from(new Set(array))

5 Object,key-value对应
obj.hasOwnProperty(typeof item + JSON.stringfy(item))&& obj[typeof item + JSON.stringfy(item)]=true;

6 排序后，每个元素比较之前的所有元素


数组展开
1.递推
function flat1 (arr) {
    let result = []
    arr.forEach(element => {
        if (Array.isArray(element)) {
            result = result.concat(flat1(element))
        } else {
            result.push(element)
        }
    });
    return result
}

2. toString
3. reduce
function flat3 (arr) {
    // 本质和 flat1 一样的，都是递归
    return arr.reduce((pre, next) => {
        return pre.concat(Array.isArray(next) ? flat3(next) : next)
    }, [])
}

4.rest运算符
function flat4 (arr) {
    while (arr.some(item => Array.isArray(item))) {
        // 相当于 [].concat('1', 2, [3, 4])
        // concat 方法本身就会把参数中的数组展开
        arr = [].concat(...arr);
    }
    return arr;
}
5. Array.flat

function flat5 (arr: any[]) {
    // flat() 方法会移除数组中的空项
    return arr.flat(Infinity)
}
防抖和节流
总结
防抖：触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间

实现思路：通过定时器来延迟执行，如果在n秒内，就清除定时器
节流：高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率

实现思路：通过比对时间差值来完成判断是否执行函数
这两个技巧主要是用在一些高频操作的场合，比如input事件、scroll事件、resize事件等等


Set、Map、WeakSet 和 WeakMap 的区别
Set和Map可以遍历，而WeakSet和WeakMap不可被遍历

Set：成员唯一，无序且不重复

Map：键值对集合

WeakSet和WeakMap的key都是弱引用，可被垃圾回收机制回收

WeakSet的成员只能是对象，否则报错

WeakMap的键只能是对象，否则报错

Set和Map都具有iterator接口

JSON和Map的区别:
JSON是字符串-值的对应
Map是值-值的对应
值可以是任意数据类型


TCP三次握手和四次挥手
TCP三次握手：1、客户端发送syn包到服务器，等待服务器确认接收。2、服务器确认接收syn包并确认客户的syn，并发送回来一个syn+ack的包给客户端。3、客户端确认接收服务器的syn+ack包，并向服务器发送确认包ack，二者相互建立联系后，完成tcp三次握手。四次握手就是中间多了一层 等待服务器再一次响应回复相关数据的过程。

三次握手之所以是三次是保证client和server均让对方知道自己的接收和发送能力没问题而保证的最小次数。

第一次client => server 只能server判断出client具备发送能力
第二次 server => client client就可以判断出server具备发送和接受能力。此时client还需让server知道自己接收能力没问题于是就有了第三次
第三次 client => server 双方均保证了自己的接收和发送能力没有问题

其中，为了保证后续的握手是为了应答上一个握手，每次握手都会带一个标识 seq，后续的ACK都会对这个seq进行加一来进行确认。

一、三次握手讲解
客户端发送位码为syn＝1,随机产生seq number=1234567的数据包到服务器，服务器由SYN=1知道客户端要求建立联机（客户端：我要连接你）
服务器收到请求后要确认联机信息，向A发送ack number=(客户端的seq+1),syn=1,ack=1,随机产生seq=7654321的包（服务器：好的，你来连吧）
客户端收到后检查ack number是否正确，即第一次发送的seq number+1,以及位码ack是否为1，若正确，客户端会再发送ack number=(服务器的seq+1),ack=1，服务器收到后确认seq值与ack=1则连接建立成功。（客户端：好的，我来了）
二、为什么http建立连接需要三次握手，不是两次或四次?
答：三次是最少的安全次数，两次不安全，四次浪费资源；

三、TCP关闭连接过程
Client向Server发送FIN包，表示Client主动要关闭连接，然后进入FIN_WAIT_1状态，等待Server返回ACK包。此后Client不能再向Server发送数据，但能读取数据。

Server收到FIN包后向Client发送ACK包，然后进入CLOSE_WAIT状态，此后Server不能再读取数据，但可以继续向Client发送数据。

Client收到Server返回的ACK包后进入FIN_WAIT_2状态，等待Server发送FIN包。

Server完成数据的发送后，将FIN包发送给Client，然后进入LAST_ACK状态，等待Client返回ACK包，此后Server既不能读取数据，也不能发送数据。

Client收到FIN包后向Server发送ACK包，然后进入TIME_WAIT状态，接着等待足够长的时间（2MSL）以确保Server接收到ACK包，最后回到CLOSED状态，释放网络资源。

Server收到Client返回的ACK包后便回到CLOSED状态，释放网络资源。

四、为什么要四次挥手？
TCP是全双工信道，何为全双工就是客户端与服务端建立两条通道，通道1:客户端的输出连接服务端的输入；通道2:客户端的输入连接服务端的输出。两个通道可以同时工作：客户端向服务端发送信号的同时服务端也可以向客户端发送信号。所以关闭双通道的时候就是这样：

客户端：我要关闭输入通道了。
服务端：好的，你关闭吧，我这边也关闭这个通道。

服务端：我也要关闭输入通道了。
客户端：好的你关闭吧，我也把这个通道关闭。