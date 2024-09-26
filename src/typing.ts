import Entity from '@framework/abstract/Entity.ts';
import React, { ReactNode } from "react";

// 组件类型声明
export type THasChildren<T = unknown> = T & { children?: ReactNode }
export type TRoutePath = string
export type TCallable = (...args: any[]) => any
export type TParameter<T extends TCallable, K extends keyof Parameters<T>> = Parameters<T>[K]
export type TCustomFormItemProps<V> = {
  id?: string
  value?: V
  onChange?: (value: V) => void
}
export type TPartialSome<E, K extends keyof E> = {
  [P in K]?: E[P]
} & Omit<E, K>
export type TOmitCallable<E> = {
  [P in keyof E as E[P] extends TCallable ? never : P]: E[P]
}
// 数据库类型声明
export type TCustomFormItem<V, P = any> = React.FC<P & TCustomFormItemProps<V>>
export type TDBSchemaPK = { id: number }
export type TDBSchemaCreatedAt = { createdAt: number }
export type TDBSchemaUpdatedAt = { updatedAt: number }
export type TTagEditable = {
  name: string
  fullName: string
  level: number
  left: number
  right: number
  parentId?: number
}
export type TBookmarkEditable = {
  name: string
  path: string
  fullPath: string
  tags: TDBSchemaTag[]
}
export type TTagBookmarkEditable = {
  tagId: number
  bookmarkId: number
}
export type TDBSchemaTag = TTagEditable & TDBSchemaPK & TDBSchemaCreatedAt & TDBSchemaUpdatedAt
export type TDBSchemaBookmark = TBookmarkEditable & TDBSchemaPK & TDBSchemaCreatedAt & TDBSchemaUpdatedAt
export type TDBSchemaTagBookmark = TTagBookmarkEditable & TDBSchemaCreatedAt
export type TDBSchemaName = 'tags' | 'bookmarks' | 'tagBookmarks'
export type TDBSchemas = {
  tags: TDBSchemaTag
  bookmarks: TDBSchemaBookmark
  tagBookmarks: TDBSchemaTagBookmark
}
// 实体类型声明
export type TEntityName = 'bookmarks' | 'tags'
export type TEntity = {
  table: TEntityName
  editable?: string[]
} & TDBSchemaPK & TDBSchemaCreatedAt & TDBSchemaUpdatedAt
export type TEntityFactory<E extends Entity> = TOmitCallable<TPartialSome<E, keyof TEntity>>
