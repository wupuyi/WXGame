import { DataStore } from "./base/DataStore.js";
import { UpPencil } from "./runtime/UpPencil.js";
import { DownPencil } from "./runtime/DownPencil.js";

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
    this.moveSpeed = 2;
  }

  createPencil () {
    const minTop = window.innerHeight / 8;
    const maxTop = window.innerHeight / 2;
    const top = minTop + Math.random() * (maxTop - minTop);
    this.dataStore.get('pencils').push(new UpPencil(top));
    this.dataStore.get('pencils').push(new DownPencil(top))
  }

  // 运行
  run () {
    if (!this.isGameOver) {
      this.dataStore.get('background').draw();

      const pencils = this.dataStore.get('pencils');

      // 一组铅笔为两个数组元素，一个屏幕要显示两组，刚好为4支
      if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
        pencils.shift();
        pencils.shift();
      }

      if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2 && pencils.length === 2) {
        this.createPencil();
      }

      this.dataStore.get('pencils').forEach((value) => {
        value.draw();
      });

      this.dataStore.get('land').draw();

      this.dataStore.get('birds').draw();

      let timer = requestAnimationFrame(() => this.run());
      this.dataStore.put('timer', timer);
    } else {
      cancelAnimationFrame(this.dataStore.get('timer'));
      this.dataStore.destroy()
    }
  }
}
