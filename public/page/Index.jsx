define('page/Index.jsx', [
  'react',
  'antd',
  'component/Header.jsx'
], function (React, antd, Header) {
  const { App, Layout } = antd
  return () => {
    return <App>
      <Layout>
        <Header></Header>
      </Layout>
    </App>
  }
})
