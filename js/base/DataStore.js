// 变量缓存器，方便我们在不同的类中访问和修改变量
export class DataStore {
  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  constructor () {
    this.map = new Map();
  }

  put (key, value) {
    if (typeof value === 'function') {
      value = new value();
    }
    this.map.set(key, value);
    // 连续put时可以链式操作
    return this;
  }

  get (key) {
    return this.map.get(key);
  }

  // 销毁资源
  destroy () {
    for(let value of this.map.values()) {
      value = null;
    }
  }
}