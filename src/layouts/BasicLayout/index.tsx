import styles from './index.module.scss';
import { useApolloClient } from '../../plugins/use-apollo-client';
import { ApolloProvider } from '@apollo/client';

export default (props: any) => {
  /**
   * graphql apollo
   */
  const client = useApolloClient();

  return (
    <ApolloProvider client={client}>
      <div className="icestark-child-app">
        <h3 className={styles.title}>商家平台</h3>
        {props.children}
      </div>
    </ApolloProvider>
  );
};
