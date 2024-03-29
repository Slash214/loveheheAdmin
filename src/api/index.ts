import { websites } from '@/typings'
import request from './http'


export const adminLogin = (data: { username: string, password: string }) => {
	return request({
		url: '/user/login',
		method: 'POST',
		data
	})
}

export const getSoftList = (params: {pageSize: number, pageIndex:number}) => {
	return request({
		url: '/software/list',
		method: 'GET',
		params
   })
}

export const addSoft = (data: any) => {
	return request({
		method: 'POST',
		data,
		url: '/software/create'
	})
}

export const updateSoft = (data: any) => {
	return request({
		method: 'PUT',
		data,
		url: '/software/fix'
	})
}

export const getBanner = () => {
	return request({
		url: '/banner/list',
		method: 'GET',
   })
}

export const createBanner = (data: any) => {
	return request({
		url: '/banner/create',
		method: 'POST',
		data
	})
}

export const getTag = (params?: { type: string }) => {
	return request({
		url: '/tag/list',
		method: 'GET',
		params
	})
}

export const createTag = (data: { label: string, type?: string }) => {
	return request({
		url: '/tag/create',
		method: 'POST',
		data
	})
}

export const addWebSite = (data: websites) => {
	return request({
		url: '/toolwebsite/create',
		method: 'POST',
		data
	})
}

export const getWebSite = (params: any) => {
	return request({
		url: '/toolwebsite/list',
		method: 'GET',
		params
	})
}

export const updateWebSite = (data: any) => {
	return request({
		url: '/toolwebsite/fix',
		method: 'PUT',
		data
	})
}

export const deletWebSite = (params: { id: number }) => {
	return request({
		url: '/toolwebsite/del',
		method: 'GET',
		params
	})
}

export const getSoftDetail = (params: { id: number }) => {
	return request({
		url: '/detail/info',
		method: 'GET',
		params
	})
}

export const addSoftDetail = (data: any) => {
	return request({
		data,
		url: '/detail/add',
		method: 'POST'
	})
}

export const updateSoftDetail = (data: any) => {
	return request({
		url: '/detail/mod',
		method: 'PUT',
		data
	})
}

export const getKeywords = (params?: { name: string }) => {
	return request({
		url: '/keyword/list',
		method: 'GET',
		params
   })
}

export const getUserNum = (params: any) => {
	return request({
		url: '/user/usernum',
		method: 'GET',
		params
   })
}

export const getWebBrowse = () => {
	return request({
		url: '/traffic/list',
		method: 'GET'
	})
}

export const updateBanner = (data: any) => {
	return request({
		url: '/banner/update',
		method: 'PUT',
		data
	})
}

export const searchKeyword = (params: any) => {
	return request({
		url: '/software/search',
		method: 'GET',
		params
   })
}