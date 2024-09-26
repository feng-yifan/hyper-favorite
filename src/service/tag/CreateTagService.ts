import Tag from '@domain/tag/Tag.ts';
import TagFactory from '@domain/tag/TagFactory.ts';
import db from '@framework/database/db.ts';
import TagRepository from '@repository/TagRepository.ts';

export default class CreateTagService {
  private tagRepository;

  constructor() {
    this.tagRepository = new TagRepository();
  }

  public async handle(name: Tag['name'], parentId?: Tag['id']) {
    return db.transaction('rw', db.tags, async () => {
      const tagProperty = parentId
        ? await this.createTagUnderTag(name, parentId)
        : await this.createTopLevelTag(name);
      const tag = new TagFactory().build(tagProperty);
      await this.tagRepository.save(tag);
      return tag;
    });
  }

  private async createTopLevelTag(name: Tag['name']) {
    const maxRightTag = await this.tagRepository.getMaxRight();
    const maxRightValue = maxRightTag ? maxRightTag.right : 0;
    return {
      name: name,
      fullName: name,
      level: 1,
      left: maxRightValue + 1,
      right: maxRightValue + 2,
    };
  }

  private async createTagUnderTag(name: Tag['name'], parentTagId: Tag['id']) {
    const parentTag = await this.tagRepository.getById(parentTagId);
    if (!parentTag) {
      throw Error(`创建标签失败：ID 为 ${parentTagId} 的标签不存在`);
    }
    await this.tagRepository.increaseLeftForLeftAbove(parentTag.right, 2);
    await this.tagRepository.increaseRightForRightAboveOrEqual(parentTag.right, 2);
    return {
      name: name,
      fullName: `${parentTag.fullName}::${name}`,
      level: parentTag.level + 1,
      left: parentTag.right,
      right: parentTag.right + 1,
      parentId: parentTagId,
    };
  }
}
