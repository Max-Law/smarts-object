# smarts-object

#### 介绍

根据 JS 对象字符串智能查找对象值，新建对象，改变对象值，并提供 vue.$set 使用帮助。

#### 安装教程

`npm i smarts-object`

`yarn add smarts-object`

#### 使用说明

1. 文件引入 ：

   `import smartsObj from "smarts-object";`

2. 参数：

   - { string } type [ find,created,change,vue ]【可选的操作类型】
   - { string } propertyName【对象字符串】
   - { object } target【目标对象】
   - { any } value [ null ]【如需添加修改值可选】

3. 使用：

   例子对象：
   `const example = { a: 1, b: { c: [1, 2, 3] } };`

   - 查找

   ```
   smartsObj("find", "b.c[0]", example); //1
   smartsObj("find", "d", example); //undefined
   ```

   - 新建

   假如查询对象存在，则直接返回查询值；不存在则返回 undefined ，并同时为目标创建新对象，值默认为 null。

   ```
   smartsObj("created", "b.d", example); //undefined
   console.log(example); //{"a":1,"b":{"c":[1,2,3],"d":null}}
   ```

   添加值：

   ```
   //查询对象不存在情况
   smartsObj("created", "d[2]", example, 4); //undefined
   console.log(example); //{"a":1,"b":{"c":[1,2,3]},"d":[null,null,4]}
   ```

   ```
   //查询对象存在情况
   smartsObj("created", "b.c[0]", example, 4); //1
   console.log(example); //{"a":1,"b":{"c":[1,2,3]}}，并不会改变值；
   ```

   也可当作对象字符串转对象使用：

   ```
   //创建一个规定格式的全新对象
   var tag = {};
   smartsObj("created", "a.b.c", tag, 4); //undefined
   console.log(tag); //{"a":{"b":{"c":4}}}
   ```

   - 修改

   与 created 大致相同，只是当查询对象存在时必定修改其值，如未传 value 则默认修改为 null

   ```
   //查询对象存在情况
   smartsObj("change", "b.c[0]", example, 4); //1 返回被修改前的值
   console.log(example); //{"a":1,"b":{"c":[4,2,3]}}
   ```

   - vue.$set

   因 vue2 响应式原理的问题，不能检测数组和对象的变化，对于未创建的对象更是如此，为了能保证监听一般采用 vue.$set 这个 api，这里提供了方便此 api 的参数生成的方法。

     - 查询对象存在情况

     ```
     //返回对象 {"target":[1,2,3],"prop":"0","value":4}
     const { target, prop, value } = smartsObj("vue", "b.c[0]", example, 4);
     //直接使用
     this.$set(target,prop,value)
     ```

     - 查询对象不存在情况

     target 会返回最后一个存在的对象；
     prop 最后一个存在对象的下一个 key 名；
     value 创建的新对象；

     ```
     //返回对象 {"target":{"c":[1,2,3]},"prop":"d","value":{"e": 4}}
     const { target, prop, value } = smartsObj("vue", "b.d.e", example, 4);
     //直接使用
     this.$set(target,prop,value)
     ```
