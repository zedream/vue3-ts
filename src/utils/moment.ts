/**
 * @description 极简版moment
 * @author Tang Hao(1115491560@qq.com)
 * @date 2022/2/14 17:08
 */

type FormatType =
  | 'yyyy-MM-dd HH:mm:ss'
  | 'yyyy-MM-dd'
  | 'HH:mm:ss'
  | 'yyyy'
  | 'MM'
  | 'dd'
  | 'HH'
  | 'dddd'

enum Time {
  BEFORE_DAWN = '凌晨',
  DAWN = '清晨',
  MORNING = '上午',
  NOON = '中午',
  AFTERNOON = '下午',
  EVENING = '晚上',
  MID_NIGHT = '午夜'
}

class Moment {
  private readonly periodStrategy: { 中午: number[]; 下午: number[]; 凌晨: number[]; 上午: number[]; 晚上: number[]; 清晨: number[]; 午夜: number[] }
  constructor () {
    this.periodStrategy = {
      凌晨: [2, 5],
      清晨: [5, 8],
      上午: [8, 12],
      中午: [12, 14],
      下午: [14, 18],
      晚上: [18, 22],
      午夜: [22, 23]
    }
  }

  private formatDate () {
    const date = new Date()
    const yyyy = date.getFullYear()
    const MM = (date.getMonth() + 1).toString().length < 2 ? '0' + (date.getMonth() + 1).toString() : date.getMonth() + 1
    const dd = date.getDate().toString().length < 2 ? '0' + date.getDate().toString() : date.getDate()
    const HH = date.getHours().toString().length < 2 ? '0' + date.getHours().toString() : date.getHours()
    const mm = date.getMinutes().toString().length < 2 ? '0' + date.getMinutes().toString() : date.getMinutes()
    const ss = date.getSeconds().toString().length < 2 ? '0' + date.getSeconds().toString() : date.getSeconds()
    const dddd = date.getDay() === 0 ? 7 : date.getDay()
    return [yyyy, MM, dd, HH, mm, ss, dddd]
  }

  private formatTypeStrategy = {
    'yyyy-MM-dd HH:mm:ss': () => {
      const t = this.formatDate()
      return `${t[0]}-${t[1]}-${t[2]} ${t[3]}:${t[4]}:${t[5]}`
    },
    'yyyy-MM-dd': () => {
      const t = this.formatDate()
      return `${t[0]}-${t[1]}-${t[2]}`
    },
    'HH:mm:ss': () => {
      const t = this.formatDate()
      return `${t[3]}:${t[4]}:${t[5]}`
    },
    yyyy: () => {
      const t = this.formatDate()
      return `${t[0]}`
    },
    MM: () => {
      const t = this.formatDate()
      return `${t[1]}`
    },
    dd: () => {
      const t = this.formatDate()
      return `${t[2]}`
    },
    HH: () => {
      const t = this.formatDate()
      return `${t[3]}`
    },
    dddd: () => {
      const t = this.formatDate()
      return `${t[6]}`
    }
  }

  public judgePeriod () {
    const HH = parseInt(this.formatTypeStrategy.HH())
    const periodKeys = Object.keys(this.periodStrategy)
    let periodName = ''
    if (HH >= 0 && HH <= 2) {
      periodName = '午夜'
    }
    Object.values(this.periodStrategy).forEach((item, index) => {
      if (HH >= item[0] && HH <= item[1]) {
        periodName = periodKeys[index]
      }
    })
    return periodName
  }

  public format (type: FormatType): string {
    return this.formatTypeStrategy[type]()
  }
}

export default new Moment()
