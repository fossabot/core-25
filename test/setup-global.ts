/*
 * @FilePath: /nx-core/test/setupFile.ts
 * @author: Wibus
 * @Date: 2022-07-02 08:47:38
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-02 08:47:38
 * Coding With IU
 */
import 'reflect-metadata'
import { beforeAll } from 'vitest'
import { register } from '~/global/index.global'

beforeAll(() => {
  register()

  // @ts-ignore
  global.isDev = true

  // @ts-ignore
  process.env.TEST = true
})