import { Rule, RuleType } from '@midwayjs/decorator';

/**
 * 查询权限列表参数
 */
export class QueryDTO {
  @Rule(RuleType.number().min(1).max(100000).default(1).optional())
  current: number;

  @Rule(RuleType.number().min(1).max(1000).default(10).optional())
  pageSize: number;

  @Rule(RuleType.string().trim().max(10).optional())
  id: string;

  @Rule(RuleType.string().trim().max(50).optional())
  name: string;

  @Rule(RuleType.string().trim().max(50).optional())
  slug: string;

  @Rule(RuleType.string().trim().max(50).optional())
  httpPath: string;

  @Rule(RuleType.string().trim().max(50).optional())
  httpMethod: string;

  @Rule(
    RuleType.string()
      .trim()
      .max(50)
      .regex(/^[a-zA-Z]*(_ASC|_DESC)$/)
      .optional()
  )
  sorter: string;
}

/**
 * 获取单条权限参数
 */
export class ShowDTO {
  @Rule(RuleType.string().trim().max(10).required())
  id: string;
}

/**
 * 删除权限参数
 */
export class RemoveDTO {
  @Rule(RuleType.array().items(RuleType.string().trim().max(10)).min(1))
  ids: string[];
}

/**
 * 创建权限参数
 */
export class CreateDTO {
  @Rule(RuleType.string().trim().max(50).required())
  name: string;

  @Rule(RuleType.string().trim().max(50).required())
  slug: string;

  @Rule(
    RuleType.array()
      .items(
        RuleType.string()
          .regex(/^(GET|POST|PUT|DELETE|PATCH|OPTIONS|HEAD|ANY)$/)
          .empty()
          .label('httpMethod')
      )
      .unique()
      .required()
  )
  httpMethod: string[];

  @Rule(RuleType.string().uri({ allowRelative: true }).required())
  httpPath: string;
}

/**
 * 更新权限参数
 */
export class UpdateDTO {
  @Rule(RuleType.string().trim().max(10).required())
  id: string;

  @Rule(RuleType.string().trim().max(50).optional())
  name: string;

  @Rule(RuleType.string().trim().max(50).optional())
  slug: string;

  @Rule(
    RuleType.array()
      .items(
        RuleType.string()
          .regex(/^(GET|POST|PUT|DELETE|PATCH|OPTIONS|HEAD|ANY)$/)
          .empty()
          .label('httpMethod')
      )
      .unique()
      .optional()
  )
  httpMethod: string[];

  @Rule(RuleType.string().uri({ allowRelative: true }).optional())
  httpPath: string;
}
