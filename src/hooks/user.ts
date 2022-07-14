/** 缓存用户信息 */

const userHook = {
	setUser: (info: {}) => {
	   localStorage.setItem('userInfo', JSON.stringify(info)) 
	},
	getUser: (): { avatar: string, nickname: string } => {
       return JSON.parse(localStorage.getItem('userInfo') || '{}')
	},
	getToken: () => {
		if (!localStorage.getItem('lovehehe_Token')) return ''
		return localStorage.getItem('lovehehe_Token')
	},
	setToken: (token: string) => {
		localStorage.setItem('lovehehe_Token', token)
	},
	delUserInfo: () => {
		localStorage.removeItem('lovehehe_Token')
		localStorage.removeItem('userInfo')
	}
}

export default userHook