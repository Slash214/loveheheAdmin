/**
 * @description 扩展 axios AxiosResponse 接口返回值字段
 * @author 爱呵呵
 */

import axios from 'axios'

declare module 'axios' {
	interface IAxios<D = null> {
		code: number
		message: string
		total?: number
		extra: D
	}
	export interface AxiosResponse<T = any> extends IAxios<D> { }
}