import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ReturnModelType } from '@typegoose/typegoose'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import {
  UserModel as User,
  UserDocument,
} from '~/modules/user/user.model'
import { InjectModel } from '~/transformers/model.transformer'
import { BusinessException } from '~/common/exceptions/business.excpetion'
import { ErrorCodeEnum } from '~/constants/error-code.constant'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly jwtService: JwtService,
  ) {}

  async signToken(_id: string) {
    const user = await this.userModel.findById(_id).select('authCode')
    if (!user) {
      throw new BusinessException(ErrorCodeEnum.MasterLostError)
    }
    const authCode = user.authCode
    const payload = {
      _id,
      authCode,
    }

    return this.jwtService.sign(payload)
  }
  async verifyPayload(payload: JwtPayload): Promise<UserDocument | null> {
    const user = await this.userModel.findById(payload._id).select('+authCode')
    if (!user) {
      throw new BusinessException(ErrorCodeEnum.MasterLostError)
    }
    return user && user.authCode === payload.authCode ? user : null
  }
}
