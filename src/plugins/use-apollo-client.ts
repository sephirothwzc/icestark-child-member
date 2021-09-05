import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { get, startsWith } from 'lodash';
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { config, useAuth } from 'ice';

// POST请求
export const useApolloClient = () => {
  const [auth] = useAuth();
  // const appUser = useSelector((state: RootState) => state?.login?.appUser);

  const errorLogLink = onError(({ graphQLErrors, networkError }) => {
    graphQLErrors &&
      graphQLErrors.forEach(({ message, locations, path }) => {
        /* eslint-disable no-console */
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      });

    if (networkError) {
      const statusCode = get(networkError, 'statusCode');
      if (statusCode === 403) {
        window.location.href = '/login';
      }
      const message = get(networkError, 'result.message', get(networkError, 'bodyText'));
      console.log(`[Network error]: ${message}`);
    }
  });

  const customFetch = async (uri: any, options: any) => {
    const { operationName, variables } = JSON.parse(options.body);
    if (!startsWith(operationName, 'Export')) {
      return fetch(uri, options);
    }
    return fetch('/export', options).then(async (response) => {
      return response
        .clone()
        .blob()
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = variables.fileName;
          a.click();
        });
    });
  };

  const httpLink = createHttpLink({
    uri: `${config.baseURL}${config.graphqlURI}`,
    fetch: customFetch as any,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        token: auth.token,
        'app-name': config.appName,
      },
    };
  });

  const requestLink = authLink.concat(httpLink);

  const client = new ApolloClient({
    link: from([errorLogLink, requestLink]),
    cache: new InMemoryCache(),
  });

  return client;
};
