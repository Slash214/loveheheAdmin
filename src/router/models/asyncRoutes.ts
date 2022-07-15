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
			{
				path: '/detail',
				component: () => import('@/views/soft/detail.vue'),
				meta: { title: '文章详情',  }
			},
		]
	},
	{
		path: '/type',
		component: Layout,
		redirect: '/tag',
		meta: { title: '软件属性管理', showMenu: true,  icon: 'icon-shoucang' },
		children: [
			{
				path: '/tag',
				meta: { title: '标签管理'  },
				component: () => import('views/MenuAndTag/index.vue')
			}
		]
	},
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
		path: '/website',
		component: Layout,
		redirect: '/hot',
		meta: { title: '网站', showMenu: true,  icon: 'icon-tupian' },
		children: [
			{
				path: '/hot',
				meta: { title: '热门网站'  },
				component: () => import('views/hotWebsite/index.vue')
			}
		]
	}

]

export default AsyncRooutes