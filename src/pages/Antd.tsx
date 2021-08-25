import React from 'react';
import './Antd.less';
import { Button } from 'antd';

export default function App () {
  return (
    <>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <br />
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </>
  );
}
