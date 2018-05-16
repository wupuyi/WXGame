import { DataStore } from "./base/DataStore.js";

// 导演类，控制游戏的逻辑
export class Director {
  // 单例
  static getInstance () {
    if (!Director.instance) {
      Director.instance = new Director();
    }
    return Director.instance;
  }

  constructor() {
    this.dataStore = DataStore.getInstance();
  }

  // 运行
  run () {
    const backgroundSprite = this.dataStore.get('background');
    backgroundSprite.draw();
  }
}
