import * as assert from 'assert';

import {
  Controller,
  Get,
  Post,
  Provide,
  Inject,
  Validate,
  Body,
  ALL,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/web';

import { AuthService } from '../service/auth';
import { LoginDTO } from '../dto/auth';
import MyError from '../util/my-error';

@Provide()
@Controller('/auth')
export class AuthController {
  @Inject('authService')
  service: AuthService;

  /**
   * 登录，目前使用帐号+密码模式
   */
  @Post('/login')
  @Validate()
  async login(ctx: Context, @Body(ALL) params: LoginDTO): Promise<void> {
    // 后续可能有多种登录方式
    const existAdmiUser = await this.service.localHandler(params);

    // 判断管理员是否存在
    assert(
      existAdmiUser !== null,
      new MyError('这些凭据与我们的记录不符', 400)
    );

    // 生成Token
    const token = await this.service.createAdminUserToken(existAdmiUser);

    // 缓存管理员数据
    await this.service.cacheAdminUser(existAdmiUser);

    // TODO: 调用 rotateCsrfSecret 刷新管理员的 CSRF token
    // ctx.rotateCsrfSecret()

    ctx.helper.success({
      token,
      currentAuthority: 'admin',
      status: 'ok',
      type: 'account',
    });
  }

  /**
   * 退出登录
   */
  @Get('/logout')
  async logout(ctx: Context): Promise<void> {
    const { currentUser } = ctx;

    // 清理管理员数据和token
    await this.service.removeAdminUserTokenById(currentUser.id);
    await this.service.cleanAdminUserById(currentUser.id);

    ctx.helper.success({});
  }

  /**
   * 获取当前管理员的信息
   */
  @Get('/currentUser')
  async currentUser(ctx: Context): Promise<void> {
    ctx.helper.success(ctx.currentUser);
  }
}
