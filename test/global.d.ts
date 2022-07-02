/*
 * @FilePath: /nx-core/test/global.d.ts
 * @author: Wibus
 * @Date: 2022-07-02 08:43:45
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-02 08:43:45
 * Coding With IU
 */
import { Consola } from 'consola'
import 'zx/globals'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Document, PaginateModel } from 'mongoose'
declare global {
  export const isDev: boolean

  export const consola: Consola

  export type MongooseModel<T> = ModelType<T> & PaginateModel<T & Document>
}

export {}
