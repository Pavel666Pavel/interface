import { Box, Flex, Typography } from '@ergolabs/ui-kit';
import { Trans } from '@lingui/macro';
import { FC } from 'react';

import { AmmPool } from '../../../common/models/AmmPool';
import { formatToAda, formatToUSD } from '../../../services/number';
import { AssetPairTitle } from '../../AssetPairTitle/AssetPairTitle';
import { DataTag } from '../../common/DataTag/DataTag';
import { IsCardano } from '../../IsCardano/IsCardano';
import { IsErgo } from '../../IsErgo/IsErgo';

interface PoolSelectorItemProps {
  readonly ammPool: AmmPool;
  readonly hover?: boolean;
  readonly active?: boolean;
  readonly hideInfo?: boolean;
}

export const PoolView: FC<PoolSelectorItemProps> = ({
  ammPool,
  hover,
  active,
  hideInfo,
}) => (
  <Box transparent height={32} bordered={false}>
    <Flex align="center" stretch>
      <Flex.Item marginRight={2}>
        <AssetPairTitle
          assetX={ammPool.x.asset}
          assetY={ammPool.y.asset}
          level="body-strong"
          size="small"
        />
      </Flex.Item>

      {!hideInfo && (
        <>
          <Flex.Item marginRight={1} align="center">
            <Typography.Body size="small" secondary>
              <Trans>Fee:</Trans>
            </Typography.Body>
          </Flex.Item>
          <Flex.Item marginRight={2} align="center">
            <DataTag
              size="extra-small"
              secondary={!hover && !active}
              content={`${ammPool.poolFee}%`}
            />
          </Flex.Item>
          <Flex.Item marginRight={1} align="center">
            <Typography.Body size="small" secondary>
              TVL:
            </Typography.Body>
          </Flex.Item>
          <Flex.Item>
            <DataTag
              size="extra-small"
              secondary={!hover && !active}
              content={
                ammPool?.tvl ? (
                  <>
                    <IsErgo>
                      {formatToUSD(ammPool.tvl.toAmount(), 'abbr')}
                    </IsErgo>
                    <IsCardano>
                      {formatToAda(ammPool.tvl.toAmount(), 'abbr')}
                    </IsCardano>
                  </>
                ) : (
                  '–––'
                )
              }
            />
          </Flex.Item>
        </>
      )}
    </Flex>
  </Box>
);
