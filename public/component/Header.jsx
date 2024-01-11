define(
  'component/Header.jsx',
  ['react', 'antd'],
  function (React, antd) {
    const { Button, Layout, message } = antd
    const { Header } = Layout

    return () => {
      const [messageApi, contextHolder] = message.useMessage();

      const showInfo = () => {
        messageApi.info('Hello, AMD module!');
      };
      return <Header>
        {contextHolder}
        <Button type="primary" onClick={showInfo}>Primary Button</Button>
      </Header>
    }
  }
)
