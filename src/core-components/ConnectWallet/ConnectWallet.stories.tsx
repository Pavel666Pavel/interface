import './ConnectWallet.stories.scss';

import { Meta, Story } from '@storybook/react';
import { Col, Row } from 'antd';
import React from 'react';

import { Button } from '../Button/Button';
import ConnectWallet from './ConnectWallet';

export default {
  title: 'Components/ConnectWallet',
  component: ConnectWallet,
} as Meta<typeof ConnectWallet>;

export const Template: Story = () => (
  <div className="main-board">
    <h1 style={{ marginBottom: 24 }}>Wallet Button</h1>

    <h2>Type=Connect to Wallet</h2>

    <Row gutter={[{ xs: 8, sm: 16, md: 24 }, 8]}>
      <Col span={8}>
        <Button className="connect-to-wallet">Connect to wallet</Button>
      </Col>
    </Row>

    <h2>Type=Wallet Connected</h2>

    <Row gutter={[{ xs: 8, sm: 16, md: 24 }, 8]}>
      <Col span={8}>
        <ConnectWallet
          type="default"
          balance={0}
          address="0x088a...378a"
        ></ConnectWallet>
      </Col>
    </Row>

    <h2>Type=Balance Only</h2>

    <Row gutter={[{ xs: 8, sm: 16, md: 24 }, 8]}>
      <Col span={8}>
        <ConnectWallet type="balance-only" balance={0}></ConnectWallet>
      </Col>
    </Row>

    <h2>Type=Address Only</h2>

    <Row gutter={[{ xs: 8, sm: 16, md: 24 }, 8]}>
      <Col span={8}>
        <ConnectWallet
          type="address-only"
          address="0x088a...378a"
        ></ConnectWallet>
      </Col>
    </Row>

    <h2>Type=Pending</h2>

    <Row gutter={[{ xs: 8, sm: 16, md: 24 }, 8]}>
      <Col span={8}>
        <ConnectWallet type="pending" balance={0}></ConnectWallet>
      </Col>
    </Row>

    <h2>Type=Pending Text</h2>

    <Row gutter={[{ xs: 8, sm: 16, md: 24 }, 8]}>
      <Col span={8}>
        <ConnectWallet type="pending-text"></ConnectWallet>
      </Col>
    </Row>

    <h2>Type=Pending Icon</h2>

    <Row gutter={[{ xs: 8, sm: 16, md: 24 }, 8]}>
      <Col span={8}>
        <ConnectWallet type="pending-icon"></ConnectWallet>
      </Col>
    </Row>
  </div>
);
