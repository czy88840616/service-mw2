import { Rule, RuleType } from '@midwayjs/decorator';

export class LoginDTO {
  @Rule(RuleType.string().required().min(5).max(190))
  username: string;

  @Rule(RuleType.string().required().min(5).max(60))
  password: string;
}
