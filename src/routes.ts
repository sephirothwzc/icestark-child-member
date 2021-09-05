import { IRouterConfig } from 'ice';
import { renderNotFound, isInIcestark } from '@ice/stark-app';
import BasicLayout from '@/layouts/BasicLayout';
import Detail from '@/pages/Detail';
import Home from '@/pages/Home';
import List from '@/pages/List';
import NotFound from '@/components/NotFound';
import MemberList from '@/pages/MemberList';

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      { path: '/list', component: List },
      { path: '/detail', component: Detail },
      { path: '/', exact: true, component: Home },
      { path: '/member-list', component: MemberList },
      {},
    ],
  },
];

export default routerConfig;
