// 资源文件加载器，确保在图片资源完成后才进行渲染
import { Resources } from './Resources.js'

export class ResourceLoader {

  constructor () {
    this.map = new Map(Resources)
    for (let [key, value] of this.map) {
      // 与微信API通用 wx.createImage()
      const image = wx.createImage();
      image.src = value
      this.map.set(key, image)
    }
  }

  onLoaded (callback) {
    let loadedCount = 0
    for (let value of this.map.values()) {
      value.onload = () => {
        loadedCount++
        if (loadedCount >= this.map.size) {
          callback(this.map)
        }
      }
    }
  }

  static create () {
    return new ResourceLoader
  }
} 