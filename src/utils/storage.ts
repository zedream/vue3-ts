import { StorageExpire } from '@/types/storage'
import { Encrypt, Decrypt } from '@/utils/security'

interface StorageName {
  value: string
  time: number
  expire: number
}

class Storage {
  private type: string

  constructor (type) {
    if (!window[type]) {
      throw new Error(`The current device does not support ${type}`)
    }
    this.type = type
  }

  set (key: string, value: unknown, expire: number = StorageExpire.Month): void {
    if (value && typeof value !== 'string') {
      value = JSON.stringify(value)
    } else if (!value) {
      value = ''
    }
    const name = {
      value: process.env.APP_NODE_ENV !== 'dev' ? Encrypt(value as string) : value,
      time: Date.now(),
      expire: expire
    }
    window[this.type].setItem(key, JSON.stringify(name))
  }

  get (key: string): string {
    let name: string | null | StorageName = window[this.type].getItem(key)
    if (typeof name === 'string') {
      name = JSON.parse(name) as StorageName
    } else {
      return ''
    }
    if (Date.now() - name.time > name.expire) {
      this.remove(key)
      return ''
    } else {
      return process.env.APP_NODE_ENV !== 'dev' ? Decrypt(name.value) : name.value
    }
  }

  remove (key): void {
    window[this.type].removeItem(key)
  }

  clear (): void {
    window[this.type].clear()
  }
}

const Session = new Storage('sessionStorage')
const Local = new Storage('localStorage')

export default {
  Session,
  Local
}
