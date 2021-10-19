import { Meta, Story } from '@storybook/react';
import { Col, Row } from 'antd';
import React from 'react';

import ConnectWallet from './ConnectWallet';

export default {
  title: 'Components/ConnectWallet',
  component: ConnectWallet,
} as Meta<typeof ConnectWallet>;

export const Template: Story = () => (
  <div>
    <h1 style={{ marginBottom: 24 }}>Wallet Button</h1>

    <Row gutter={[{ xs: 8, sm: 16, md: 24 }, 16]}>
      <h2>Type=Connect to Wallet</h2>
      <Col span={24}>
        <ConnectWallet type="default" />
      </Col>

      <h2>Type=Wallet Connected</h2>
      <Col span={24}>
        <ConnectWallet
          type="connected"
          balance={0}
          currency="ERG"
          address="9iKWmL5t3y9u59fUESsbFQzG933UPjR1v7LUAjM6XPMAcXNhBzL"
        />
      </Col>

      <h2>Type=Balance Only</h2>
      <Col span={24}>
        <ConnectWallet type="balance-only" balance={0} currency="ERG" />
      </Col>

      <h2>Type=Address Only</h2>
      <Col span={24}>
        <ConnectWallet
          type="address-only"
          address="9iKWmL5t3y9u59fUESsbFQzG933UPjR1v7LUAjM6XPMAcXNhBzL"
        />
      </Col>

      <h2>Type=Pending</h2>
      <Col span={24}>
        <ConnectWallet type="pending" balance={0} currency="ERG" />
      </Col>

      <h2>Type=Pending Text</h2>
      <Col span={24}>
        <ConnectWallet type="pending-text" />
      </Col>

      <h2>Type=Pending Icon</h2>
      <Col span={24}>
        <ConnectWallet type="pending-icon" />
      </Col>
    </Row>
  </div>
);
