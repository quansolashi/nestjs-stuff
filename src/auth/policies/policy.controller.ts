import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { RolesGuard } from '../guards/role.guard';
import { PolicyService } from './policy.service';

@Controller('policies')
export default class PolicyController {
  constructor(private policyService: PolicyService) {}

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('roles')
  async roles() {
    return this.policyService.roles();
  }

  @Get('permissions')
  async permissions() {
    return this.policyService.permissions();
  }
}
