import Tag from '@domain/tag/Tag.ts';
import TagFactory from '@domain/tag/TagFactory.ts';
import EntityRepository from '@framework/abstract/EntityRepository.ts';

export default class TagRepository extends EntityRepository {
  public async getByKeyWords(keyWords: string[]) {
    if (keyWords.length < 1) {
      return [];
    }
    const regExp = new RegExp(keyWords.map(word => `(?=.*${word})`).join(''), 'i');
    const tags = await this.db.tags.filter(tag => regExp.test(tag.fullName)).toArray();
    const factory = new TagFactory();
    return tags.map(tag => factory.build(tag));
  }

  public async getByParentId(parentId: Tag['id']) {
    const tags = await this.db.tags.where('parentId').equals(parentId).toArray();
    const factory = new TagFactory();
    return tags.map(tag => factory.build(tag));
  }

  public async getByLevel(level: Tag['level']) {
    const tags = await this.db.tags.where('level').equals(level).toArray();
    const factory = new TagFactory();
    return tags.map(tag => factory.build(tag));
  }

  public async getMaxRight() {
    const tag = await this.db.tags.orderBy('right').last();
    return tag
      ? await new TagFactory().build(tag)
      : undefined;
  }

  public async getById(id: Tag['id']) {
    const tag = await this.db.tags.where('id').equals(id).first();
    return tag ? new TagFactory().build(tag) : undefined;
  }

  public async increaseLeftForLeftAbove(above: Tag['left'], incremental: Tag['left']) {
    await this.db.tags
      .where('left')
      .above(above)
      .modify(tag => {
        tag.left = tag.left + incremental;
      });
  }

  public async increaseRightForRightAboveOrEqual(above: Tag['right'], incremental: Tag['right']) {
    await this.db.tags
      .where('right')
      .aboveOrEqual(above)
      .modify(tag => {
        tag.right = tag.right + incremental;
      });
  }
}
