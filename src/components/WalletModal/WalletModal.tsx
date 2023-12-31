import { Box, Button, Flex, Modal, useDevice } from '@ergolabs/ui-kit';
import { Trans } from '@lingui/macro';
import { fireAnalyticsEvent } from '@spectrumlabs/analytics';
import { CSSProperties } from 'react';
import * as React from 'react';

import { useObservable } from '../../common/hooks/useObservable';
import { networkAssetBalance$ } from '../../gateway/api/networkAssetBalance';
import { disconnectWallet, selectedWallet$ } from '../../gateway/api/wallets';
import { useSelectedNetwork } from '../../gateway/common/network';
import { patchSettings } from '../../network/ergo/settings/settings';
import { isLowBalance } from '../../utils/walletMath';
import { SensitiveContentToggle } from '../SensitiveContentToggle/SensitiveContentToggle.tsx';
import { LowBalanceWarning } from './LowBalanceWarning/LowBalanceWarning';
import { WalletActiveAddress } from './WalletActiveAddress/WalletActiveAddress';
import { WalletTokens } from './WalletTokens/WalletTokens';
import { WalletTotalBalance } from './WalletTotalBalance/WalletTotalBalance';

export const WalletModal: React.FC<{ close: (result?: any) => void }> = ({
  close,
}) => {
  const { valBySize } = useDevice();
  const [networkAssetBalance] = useObservable(networkAssetBalance$);
  const [selectedWallet] = useObservable(selectedWallet$);
  const [network] = useSelectedNetwork();

  const handleDisconnectWalletClick = () => {
    fireAnalyticsEvent('Disconnect Wallet', {
      wallet_name: selectedWallet?.name || 'null',
      wallet_network: network.name,
    });
    disconnectWallet();
    patchSettings({ ergopay: false });
    close();
  };

  return (
    <>
      <Modal.Title>
        <Flex align="center">
          {selectedWallet?.icon}
          <Flex.Item marginLeft={2} marginRight={2}>
            {selectedWallet?.name}
          </Flex.Item>
          <SensitiveContentToggle />
        </Flex>
      </Modal.Title>
      <Modal.Content width={valBySize<CSSProperties['width']>('100%', 470)}>
        <Flex col>
          <Flex.Item marginBottom={4} marginTop={2}>
            <WalletTotalBalance balance={networkAssetBalance} />
          </Flex.Item>
          {isLowBalance(Number(networkAssetBalance), network.name) && (
            <Flex.Item marginBottom={4}>
              <LowBalanceWarning network={network} />
            </Flex.Item>
          )}
          <Flex.Item marginBottom={6}>
            <WalletActiveAddress />
          </Flex.Item>
          <Flex.Item marginBottom={6}>
            <Box transparent padding={0} bordered={false}>
              <WalletTokens close={close} />
            </Box>
          </Flex.Item>
          <Button
            type="default"
            size="large"
            onClick={handleDisconnectWalletClick}
          >
            <Trans>Disconnect wallet</Trans>
          </Button>
        </Flex>
      </Modal.Content>
    </>
  );
};
