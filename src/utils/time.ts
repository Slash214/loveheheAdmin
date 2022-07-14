/** 时间格式化 */
import dayjs from 'dayjs'

const formatTime = (t: Date | string ) => {
	if (!t) return 'params is null'
	return dayjs(t).format('YYYY-MM-DD HH:mm:ss')
}

export {
	formatTime
} 