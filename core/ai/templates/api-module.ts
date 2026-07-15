/**
 * 标准 API 模块模板
 * 使用方式：复制此文件，替换 Entity 为实际业务实体名
 */

import http from '@/utils/http'

// --- 类型定义 ---

export interface Entity {
  id: number
  name: string
  createdAt: string
}

export interface GetEntityListParams {
  page: number
  pageSize: number
  keyword?: string
}

export interface GetEntityListResponse {
  list: Entity[]
  total: number
}

export interface CreateEntityParams {
  name: string
}

export interface UpdateEntityParams extends Partial<CreateEntityParams> {
  id: number
}

// --- API 函数 ---

export const entityApi = {
  /** 获取列表 */
  getList(params: GetEntityListParams) {
    return http.get<GetEntityListResponse>('/entity/list', { params })
  },

  /** 获取详情 */
  getById(id: number) {
    return http.get<Entity>(`/entity/${id}`)
  },

  /** 创建 */
  create(data: CreateEntityParams) {
    return http.post<Entity>('/entity', data)
  },

  /** 更新 */
  update(data: UpdateEntityParams) {
    return http.put<Entity>(`/entity/${data.id}`, data)
  },

  /** 删除 */
  delete(id: number) {
    return http.delete(`/entity/${id}`)
  }
}
