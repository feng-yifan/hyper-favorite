import Tag from '@domain/tag/Tag.ts';
import { TEntityFactory } from '@typing.ts';

export default class TagFactory {
  public build(params: TEntityFactory<Tag>) {
    const tag = new Tag();
    tag.name = params.name;
    tag.fullName = params.fullName;
    tag.level = params.level;
    tag.left = params.left;
    tag.right = params.right;
    tag.parentId = params.parentId;
    if (params.id) {
      tag.id = params.id;
      tag.createdAt = params.createdAt!;
      tag.updatedAt = params.updatedAt!;
    }
    return tag;
  }
}
