import Entity from '@framework/abstract/Entity.ts';
import { TDBSchemaTag } from '@typing.ts';

export default class Tag extends Entity implements TDBSchemaTag {
  name!: string;
  fullName!: string;
  level!: number;
  left!: number;
  right!: number;
  parentId?: number;

  public table = 'tags' as const;
  public editable = ['name', 'fullName', 'level', 'left', 'right', 'parentId'];

  constructor() {
    super();
  }
}
