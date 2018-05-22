import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { Director } from "./js/Director.js";
import { BackGround } from "./js/runtime/BackGround.js";
import { DataStore } from "./js/base/DataStore.js";
import { Land } from "./js/runtime/Land.js";
import { Birds } from "./js/player/Birds.js";
import { StartButton } from "./js/player/StartButton.js";
import { Score } from "./js/player/Score.js";
import { ApiExamples } from "./js/ApiExamples.js";

// 初始化整个游戏的精灵，作为游戏开始的入口
export class Main {
  constructor () {
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.dataStore = DataStore.getInstance();
    this.director = Director.getInstance();
    const loader = ResourceLoader.create();
    loader.onLoaded(map => this.onResourceFirstLoaded(map));
  }

  // 创建背景音乐
  createBackgroundMusic () {
    var bgm = wx.createInnerAudioContext();
    bgm.autoplay = true;
    bgm.loop = true;
    bgm.src = 'audios/bgm.mp3';
  }

  onResourceFirstLoaded (map) {
    this.dataStore.canvas = this.canvas;
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    // 调用背景音乐
    // this.createBackgroundMusic();
    const examples = new ApiExamples();
    // examples.getUerInfo();
    // examples.login();
    // examples.getSettings();
    // examples.httpExample();
    // examples.socketExample();
    examples.download();
    this.init(); 
  }

  init () {
    // 首先重置游戏是没有结束的
    this.director.isGameOver = false;

    this.dataStore
        .put('pencils', [])
        .put('background', BackGround)
        .put('land', Land)
        .put('birds', Birds)
        .put('score', Score)
        .put('startButton', StartButton);
    // let background = new BackGround(this.ctx, map.get('background'));
    // background.draw();
    this.registerEvent();
    // 创建铅笔要在游戏逻辑运行之前
    this.director.createPencil();
    this.director.run();
  }

  registerEvent () {
    // this.canvas.addEventListener('touchstart', e => {
    //   // 屏蔽掉js的时间冒泡
    //   e.preventDefault();
    //   if (this.director.isGameOver) {
    //     console.log('游戏开始')
    //     this.init();
    //   } else {
    //     this.director.birdsEvent();
    //   }
    // });
    wx.onTouchStart(() => {
      if (this.director.isGameOver) {
        console.log('游戏开始')
        this.init();
      } else {
        this.director.birdsEvent();
      }
    })
  }

}