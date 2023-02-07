import { Injectable } from '@nestjs/common';

@Injectable()
export class RegistryService {
  private readonly cats: any[] = ['a', 'b', 'c', 'd'];

  create(cat: any) {
    this.cats.push(cat);
  }

  findAll(): any[] {
    return this.cats;
  }
}
