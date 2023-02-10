//是否为数字
export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str);
}

export const SMARTS_OBJECT = (
  type = 'find',
  propertyName,
  target,
  value = null,
) => {
  if (
    typeof propertyName !== 'string' ||
    propertyName === undefined ||
    (type !== 'validator' &&
      (target === undefined || typeof target !== 'object'))
  ) {
    console.error('[Error][SMARTS_OBJECT] parameter error !');
    return;
  }

  let list = []; //解构 propertyName 后的数组

  //以 . 区分切割成数组 , 解构 [] 对象写法
  const regex = /(?<=\[)(.+?)(?=\])/g;
  propertyName.split('.').forEach((item) => {
    const objProp = item.replace(/\[.+?\]/g, '');
    let arrayProp = item.match(regex) || [];

    if (objProp) {
      // @ts-ignore
      arrayProp.unshift(objProp);
    }

    list.push(...arrayProp);
  });

  //创建不存在对象函数
  const build_obj = (arr = [], val) => {
    if (arr.length === 0) {
      return val;
    }

    let created_obj;

    //初始值确定
    if (isNumberStr(arr[0])) {
      created_obj = [];
    } else {
      created_obj = {};
    }

    //设置循环体
    let loopBody = created_obj;

    for (let index = 0; index < arr.length; index++) {
      const current = arr[index],
        next = arr[index + 1];

      if (next === undefined) {
        loopBody[current] = val;
        return created_obj;
      }

      if (isNumberStr(next)) {
        loopBody[current] = [];
      } else {
        loopBody[current] = {};
      }

      loopBody = loopBody[current];
    }
  };

  if (type === 'created' || type === 'change') {
    let prev = null;

    for (let index = 0; index < list.length; index++) {
      const current = list[index];

      if (target[current] === undefined) {
        if (typeof target !== 'object') {
          console.error(
            `[Error][SMARTS_OBJECT] Intermediate variable '${
              list[index - 1]
            }' is not Object !`,
          );
        } else {
          target[current] = build_obj(list.slice(index + 1), value);
        }
        return;
      }

      prev = target;
      target = target[current];
    }

    if (type === 'change') {
      prev[list[list.length - 1]] = value;
    }

    return target;
  } else if (type === 'vue') {
    for (let index = 0; index < list.length; index++) {
      const current = list[index];

      if (target[current] === undefined || index == list.length - 1) {
        if (typeof target !== 'object') {
          console.error(
            `[Error][SMARTS_OBJECT] Intermediate variable '${
              list[index - 1]
            }' is not Object !`,
          );
        } else {
          return {
            target: target,
            prop: current,
            value: build_obj(list.slice(index + 1), value),
          };
        }
        return;
      }

      target = target[current];
    }
  } else if (type === 'validator') {
    let validatorProp = list[0];
    for (let index = 1; index < list.length; index++) {
      const current = list[index];
      validatorProp = validatorProp + '[' + current + ']';
    }
    return validatorProp;
  } else {
    for (let index = 0; index < list.length; index++) {
      if (target === undefined) {
        return;
      }
      const item = list[index];
      target = target[item];
    }

    return target;
  }
};
