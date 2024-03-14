1. 基本数据类型
    number、string、boolean、null、undefined、Array、Object、
    Touple（元组类型）、Enum（枚取类型）、void、never
```ts
    let num: number = 1;
    let str: sting = '';
    let isFalse: boolean = false;
    let Array: number[] = [1]

    //通过key获取值
    enum Color { red, green, blue }  
    console.log(Color.red) // 输出: 0  
    console.log(Color.green) // 输出: 1  
    console.log(Color.blue) // 输出: 2

    enum Color1 { red = 1, green, blue }  
    console.log(Color1.red) // 输出: 1  
    console.log(Color1.green) // 输出: 2  
    console.log(Color1.blue) // 输出: 3
    // 值获取key
    enum Color {Red = 1, Green, Blue}
    let colorName: string = Color[2];
    console.log(colorName);  // 显示'Green'因为上面代码里它的值是2

    let toupleData: [number, string] = [1, '']

    // Declare a tuple type
    let x: [string, number];
    // Initialize it
    x = ['hello', 10]; // OK
    // Initialize it incorrectly
    x = [10, 'hello']; // Error
    console.log(x[0].substr(1)); // OK
    console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
    x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
    console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
    x[6] = true; // Error, 布尔不是(string | number)类型
```
2. extend、interface、implement，使用这两个实现类型混淆
```ts
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

3. 高级类型： 交叉类型、联合类型。& 、|

```ts
// 交叉类型
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
        // ...
    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
// 联合类型
interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors
```

```ts
interface Shape {  
    area(): number;  
    perimeter(): number;  
}  
  
class Rectangle implements Shape {  
    constructor(public width: number, public height: number) {}  
  
    area(): number {  
        return this.width * this.height;  
    }  
  
    perimeter(): number {  
        return 2 * (this.width + this.height);  
    }  
}  
  
const rect = new Rectangle(10, 5);  
console.log(rect.area());  
console.log(rect.perimeter());
```
4.namespace 和 module的使用场景，namespace的缺陷。
```ts
namespace MyNamespace {  
    export class MyClass {  
        constructor(public name: string) {}  
        greet() {  
            console.log(`Hello, ${this.name}!`);  
        }  
    }  
}  
  
const instance = new MyNamespace.MyClass('Alice');  
instance.greet();

```
```ts
// myModule.ts  
export class MyClass {  
    constructor(public name: string) {}  
    greet() {  
        console.log(`Hello, ${this.name}!`);  
    }  
}
// anotherFile.ts  
import { MyClass } from './myModule';  
  
const instance = new MyClass('Bob');  
instance.greet();
```

5.泛型< T >、infer


```ts
type InferredType<T> = T extends { a: infer U } ? U : never;  
  
type Result1 = InferredType<{ a: string }>; // Result1 类型是 string  
type Result2 = InferredType<{ b: number }>; // Result2 类型是 never

type Partial<T> = {  
    [P in keyof T]?: T[P];  
};  
  
type MyType = {  
    a: string;  
    b: number;  
};  
  
type PartialMyType = Partial<MyType>; // { a?: string; b?: number; }
```
7. 函数
```
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}

interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
```

