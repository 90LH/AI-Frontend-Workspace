/**
 * 标准 Composable 模板
 * 使用方式：复制此文件，替换 Entity 为实际业务实体名
 */

import { ref, onMounted } from 'vue'
import type { Entity, GetEntityListParams } from '@/api/entityApi'
import { entityApi } from '@/api/entityApi'

export function useEntityList(autoFetch = true) {
  const list = ref<Entity[]>([])
  const total = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const params = ref<GetEntityListParams>({
    page: 1,
    pageSize: 20
  })

  async function fetchList() {
    loading.value = true
    error.value = null
    try {
      const res = await entityApi.getList(params.value)
      list.value = res.list
      total.value = res.total
    } catch {
      error.value = '加载失败，请重试'
    } finally {
      loading.value = false
    }
  }

  function setPage(page: number) {
    params.value.page = page
    fetchList()
  }

  function setSearch(keyword: string) {
    params.value.page = 1
    params.value.keyword = keyword
    fetchList()
  }

  if (autoFetch) {
    onMounted(fetchList)
  }

  return {
    list,
    total,
    loading,
    error,
    params,
    fetchList,
    setPage,
    setSearch
  }
}
