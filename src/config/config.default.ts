import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { JwtConfig } from '@waiting/egg-jwt';
import { ConnectionOptions } from 'typeorm';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1602294995416_4568';

  // add your config here
  config.middleware = ['jwtAuth'];

  // 默认管理员
  config.admin = {
    username: 'admin',
    password: 'admin',
  };

  // 数据库配置
  config.orm = {
    type: 'mysql',
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_HOST || 3306,
    username: process.env.MYSQL_USER || '',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || undefined,
    synchronize: false,
    logging: true,
    timezone: '+08:00',
  } as ConnectionOptions;

  // redis配置
  config.redis = {
    client: {
      port: +process.env.REDIS_PORT || 6379, // Redis port
      host: process.env.REDIS_HOST || '127.0.0.1', // Redis host
      password: process.env.REDIS_PASSWORD || '',
      db: +process.env.REDIS_DB || 0,
    },
  };

  // jwt配置
  config.jwt = {
    enable: true,
    client: {
      secret: '123456', // 默认密钥，生产环境一定要更改
    },
    ignore: ['/auth/login', '/ping'],
  } as JwtConfig;

  // jwt token 校验中间件(需配合jwt使用, ignore的配置与jwt一致)
  config.jwtAuth = {
    ignore: config.jwt.ignore,
    redisScope: 'admin', // redis的作用域前缀
    accessTokenExpiresIn: 60 * 60 * 24 * 3, // 签名过期时间也可写
  };

  return config;
};
