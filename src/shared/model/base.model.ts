import { ApiHideProperty } from '@nestjs/swagger'
import { index, modelOptions, plugin, prop } from '@typegoose/typegoose'
import { IsBoolean, IsOptional, IsString, IsNotEmpty } from 'class-validator'
import LeanId from 'mongoose-lean-id'
import { default as mongooseLeanVirtuals } from 'mongoose-lean-virtuals'
import Paginate from 'mongoose-paginate-v2'

@plugin(mongooseLeanVirtuals)
@plugin(LeanId)
@plugin(Paginate)
@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: {
      createdAt: 'created',
      updatedAt: false,
    },
  },
})
@index({ created: -1 })
@index({ created: 1 })
export class BaseModel {
  @ApiHideProperty()
  created?: Date

  @ApiHideProperty()
  id?: string

  static get protectedKeys() {
    return ['created', 'id', '_id']
  }
}
export abstract class BaseCommentIndexModel extends BaseModel {
  @prop({ default: 0 })
  @ApiHideProperty()
  commentsIndex?: number

  @prop({ default: true })
  @IsBoolean()
  @IsOptional()
  allowComment: boolean

  static get protectedKeys() {
    return ['commentsIndex'].concat(super.protectedKeys)
  }
}
export class WriteBaseModel extends BaseCommentIndexModel {
  @prop({ trim: true, index: true, required: true })
  @IsString()
  @IsNotEmpty()
  title: string

  @prop({ trim: true })
  @IsString()
  text: string

  // @prop({ type: ImageModel })
  // @ApiHideProperty()
  // @IsOptional()
  // @ValidateNested()
  // @Type(() => ImageModel)
  // images?: ImageModel[]

  @prop({ default: null, type: Date })
  @ApiHideProperty()
  modified: Date | null

  static get protectedKeys() {
    return super.protectedKeys
  }
}
@modelOptions({
  schemaOptions: { id: false, _id: false },
  options: { customName: 'count' },
})
export class CountMixed {
  @prop({ default: 0 })
  read?: number

  @prop({ default: 0 })
  like?: number
}