import request from './http'



const baseURL = ''

export const getSoftList = (params: {pageSize: number, pageIndex:number}) => {
	return request({
		url: '',
		method: 'GET',
		params
   })
}

