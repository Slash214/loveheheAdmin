import { RouteRecordRaw } from "vue-router";
import Layout from '@/layout/index.vue'

const AsyncRooutes: Array<RouteRecordRaw> = [
	{
		path: '/soft',
		component: Layout,
		redirect: '/list',
		meta: { title: '软件文章', showMenu: true, icon: 'icon-dingdan' },
		children: [
			{
				path: '/list',
				component: () => import('@/views/soft/softList.vue'),
				meta: { title: '软件文章列表',  }
			},
			{
				path: '/create',
				component: () => import('@/views/soft/create.vue'),
				meta: { title: '创建软件文章',  }
			},
		]
	},

]

export default AsyncRooutes