import { Controller, Get, Post } from '@nestjs/common';
import { RegistryService } from './registry.service';
@Controller('registry')
export class RegistryController {
  constructor(private readonly registryService: RegistryService) {}

  @Get()
  findAll(): any {
    return this.registryService.findAll();
  }
}
