define(
  'component/Header.jsx',
  ['react', 'antd'],
  function (React, antd) {
    const { Button } = antd
    return () => (
      <header>
        header
        <Button type="primary">Primary Button</Button>
      </header>
    )
  }
)
