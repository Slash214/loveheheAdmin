import { RouteRecordRaw } from "vue-router";
import Layout from '@/layout/index.vue'

const Demo: Array<RouteRecordRaw> = [
	{
		path: '/demo',
		component: Layout,
		redirect: '/demo1',
		meta: { title: '测试Demo', showMenu: true, icon: 'icon-faxian' },
		children: [
			{
				path: '/demo1',
				component: () => import('@/views/demo/demo1.vue'),
				meta: { title: '测试路由Demo',  }
			},
			{
				path: '/demo2',
				component: () => import('@/views/demo/demo2.vue'),
				meta: { title: '测试路由Demo2',  }
			},
		]
	},

]

export default Demo