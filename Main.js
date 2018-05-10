import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { Director } from "./js/Director.js";
import { BackGround } from "./js/runtime/BackGround.js";

// 初始化整个游戏的精灵，作为游戏开始的入口
export class Main {
  constructor () {
    this.canvas = document.getElementById('game_canvas')
    this.ctx = this.canvas.getContext('2d')
    const loader = ResourceLoader.create()
    loader.onLoaded(map => this.onResourceFirstLoaded(map))
  }

  onResourceFirstLoaded (map) {
    let background = new BackGround(this.ctx, map.get('background'))
    background.draw()
  }
}