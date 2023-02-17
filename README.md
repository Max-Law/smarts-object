# smarts-object

#### Introduction

Find the object value intelligently according to the JS object string, create a new object, change the object value, and provide vue$ Set use help.

#### Installation Tutorial

`npm i smarts-object`

`yarn add smarts-object`

#### Instructions for use

1.  File import:
    `import smartsObj from "smarts-object";`
2.  Parameters:
    - {string} type [find, created, change, vue] [optional operation type]
    - {string} propertyName [object string]
    - {object} target [target object]
    - {any} value [null]
3.  Use:
    Example object:
    `const example = { a: 1, b: { c: [1, 2, 3] } };`

    - Find

      ```
      smartsObj("find", "b.c[0]", example); // one
      smartsObj("find", "d", example); // undefined
      ```

    - Created
      If the query object exists, the query value is returned directly; If it does not exist, it returns undefined and creates a new object for the target. The default value is null.

      ```
      smartsObj("created", "b.d", example); // undefined
      console.log(example); // {"a":1,"b":{"c":[1,2,3],"d":null}}
      ```

      - Add value:

      ```
      //The query object does not exist
      smartsObj("created", "d[2]", example, 4); // undefined
      console.log(example); // {"a":1,"b":{"c":[1,2,3]},"d":[null,null,4]}
      ```

      ```
      //Query object existence
      smartsObj("created", "b.c[0]", example, 4); // one
      console.log(example); // {"a": 1, "b": {"c": [1,2,3]}, does not change the value;
      ```

      It can also be used as object string to object:

      ```
      //Create a new object in the specified format
      var tag = {};
      smartsObj("created", "a.b.c", tag, 4); // undefined
      console.log(tag); // {"a":{"b":{"c":4}}}
      ```

      - Modify
        It is roughly the same as created, except that when the query object exists, its value must be modified. If no value is passed, it will be modified to null by default

      ```
      //Query object existence
      smartsObj("change", "b.c[0]", example, 4); // 1 Return the value before modification
      console.log(example); // {"a":1,"b":{"c":[4,2,3]}}
      ```

      - vue.$set
      Due to the problem of the response principle of vue 2, it is not possible to detect the changes of arrays and objects, especially for objects that have not been created. In order to ensure monitoring, vue is generally used$ Set this api. Here is a method to facilitate the parameter generation of this api.

        - Query existence object

          ```
          //Return object {"target": [1,2,3], "prop": "0", "value": 4}
          const { target, prop, value } = smartsObj("vue", "b.c[0]", example, 4);
          //Direct use
          this.$ set(target,prop,value)
          ```

        - The query object does not exist
          Target will return the last existing object;
          The next key name of the last existing object in prop;
          New object created by value;

          ```
          //Return object {"target": {"c": [1,2,3]}, "prop": "d", "value": {"e": 4}}
          const { target, prop, value } = smartsObj("vue", "b.d.e", example, 4);
          //Direct use
          this.$ set(target,prop,value)
          ```
