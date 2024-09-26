/**
 * 克隆对象并剔除部分属性
 * @param object
 * @param keys
 */
const cloneWithout = <T extends object, K extends keyof T>(object: T, keys: K[]): Omit<T, K> => {
  const newObject = {...object};
  for (const key of keys) {
    delete newObject[key];
  }
  return newObject;
};

const obj = {
  cloneWithout,
};
export default obj;
