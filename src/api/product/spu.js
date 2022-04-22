import request from '@/utils/request'
export const reqSpuList = (page, limit, category3Id) => request({
    url:`/admin/product/${page}/${limit}`,
    method:'get',
    params:{category3Id}
})
// /admin/product/getSpuById/{spuId} 
export const reqSpuById = (spuId) => request({
    url:`/admin/product/getSpuById/${spuId}`,
    method:'get',
})
// /admin/product/baseTrademark/getTrademarkList 
export const reqTrademarkList = () => request({
    url:`/admin/product/baseTrademark/getTrademarkList`,
    method:'get',
})

// /admin/product/spuImageList/{spuId} 
export const reqSpuImageList = (spuId) => request({
    url:`/admin/product/spuImageList/${spuId}`,
    method:'get',
})

// /admin/product/baseSaleAttrList 
export const reqBaseSaleAttrList = () => request({
    url:`/admin/product/baseSaleAttrList`,
    method:'get',
})

export const reqAddOrUpdateSpu = (spuInfo) => {
    if (spuInfo.id) {
        return request({
            url:'/admin/product/updateSpuInfo',
            method:'post',
            data:spuInfo
        })
    } else {
        return request({
            url:'/admin/product/saveSpuInfo',
            method:'post',
            data:spuInfo
        })
    }
}

export const reqDeleteSpu = (spuId) => request({
    url:`/admin/product/deleteSpu/${spuId}`,
    method:'delete'
})

export const reqFindBySpuId = (spuId) => request({
    url:`admin/product/findBySpuId/${spuId}`,
    method:'get'
})