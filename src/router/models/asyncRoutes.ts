import { RouteRecordRaw } from "vue-router";
import Layout from '@/layout/index.vue'

const AsyncRooutes: Array<RouteRecordRaw> = [
	{
		path: '/banner',
		component: Layout,
		redirect: '/image',
		meta: { title: 'Banner', showMenu: true,  icon: 'icon-tupian' },
		children: [
			{
				path: '/image',
				meta: { title: '轮播图'  },
				component: () => import('views/banner/index.vue')
			}
		]
	},
	{
		path: '/soft',
		component: Layout,
		redirect: '/list',
		meta: { title: '软件文章', showMenu: true, icon: 'icon-dingdan' },
		children: [
			{
				path: '/list',
				component: () => import('@/views/soft/softList.vue'),
				meta: { title: '软件文章列表', }
			},
		]
	},
	{
		path: '/type',
		component: Layout,
		redirect: '/tag',
		meta: { title: '软件&网站标签', showMenu: true,  icon: 'icon-shoucang' },
		children: [
			{
				path: '/tag',
				meta: { title: '标签管理'  },
				component: () => import('views/MenuAndTag/index.vue')
			}
		]
	},
	{
		path: '/website',
		component: Layout,
		redirect: '/hot',
		meta: { title: '工具网站', showMenu: true,  icon: 'icon-tupian' },
		children: [
			{
				path: '/hot',
				meta: { title: '热门网站'  },
				component: () => import('views/hotWebsite/index.vue')
			}
		]
	},
	{
		path: '/xq',
		component: Layout,
		redirect: '/detail',
		meta: { title: '文章详情', showMenu: true,  icon: 'icon-tupian' },
		children: [
			{
				path: '/detail/:id',
				meta: { title: '详情内容'  },
				component: () => import('views/soft/detail.vue')
			}
		]
	}

]

export default AsyncRooutes