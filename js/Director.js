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

  birdsEvent () {
    // if (this.dataStore.get('birds'))
    for (let i = 0; i <= 2; i++) {
      this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
    }
    this.dataStore.get('birds').time = 0;
  }

  // 判断小鸟是否撞击地板和铅笔
  check () {
    const birds = this.dataStore.get('birds');
    const land = this.dataStore.get('land');
    // 地板的撞击判断
    if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
      console.log('撞击地板了');
      this.isGameOver = true;
      return ;
    }
  }

  // 运行
  run () {
    this.check();
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
