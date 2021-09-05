export default {
  // 默认配置
  default: {
    baseURL: '/',
    graphqlURI: 'graphql',
    appName: 'icestark-child-member',
  },
  local: {
    // eslint-disable-next-line @iceworks/best-practices/no-http-url
    baseURL: 'http://127.0.0.1:8025/',
    appId: '456',
  },
  prod: {
    appId: '101',
  },
};
