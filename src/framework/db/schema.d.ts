declare namespace schema {
  declare type TColumns = Record<string, any>
  declare type TPrimaryKeyKey = 'id'
  declare type TPrimaryKeyColumn = { [K in TPrimaryKeyKey]: number }
  declare type TTimeKey = 'createdAt' | 'updatedAt'
  declare type TTimeColumn<> = { [K in TTimeKey]: number }

  declare type TWithoutTimeColumn<T extends TColumns> = Omit<T, TTimeKey>
  declare type TEditableColumns<T extends TColumns> = Omit<T, TPrimaryKeyKey | TTimeKey>

  declare namespace bookmark {
    declare type TTableTag = {
      name: string      // 本级标签名称，ex：test
      fullName: string  // 标签全名，ex：test::test::test
      level: number     // 标签层级
      left: number
      right: number
      parentId?: number // 父标签 id
    } & TPrimaryKeyColumn & TTimeColumn
    declare type TBookmark = {
      name: string      // 书签名称
      path: string      // 书签路径
      fullPath: string  // 带有 get 参数与 hash 值的完整路径
      tags: TTableTag[]      // 缓存的书签关联标签信息
    } & TPrimaryKeyColumn & TTimeColumn
    declare type TTagBookmark = {
      tagId: number
      bookmarkId: number
    } & TTimeColumn
  }
}
