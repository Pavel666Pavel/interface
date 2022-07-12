import {
  combineLatest,
  first,
  map,
  Observable,
  publishReplay,
  refCount,
} from 'rxjs';

import { AmmPool } from '../../../../common/models/AmmPool';
import { AssetInfo } from '../../../../common/models/AssetInfo';
import { localStorageManager } from '../../../../common/utils/localStorageManager';
import { networkAsset } from '../networkAsset/networkAsset';
import { defaultTokenList$ } from './defaultTokenList';

const IMPORTED_TOKEN_ASSETS_KEY = 'ergo-imported-token';

export const DEFAULT_IMPORTED_TOKEN_ASSETS = [networkAsset.id];

const importedTokenAssets$ = localStorageManager
  .getStream<string[]>(IMPORTED_TOKEN_ASSETS_KEY)
  .pipe(
    map((importedTokenAssets) =>
      importedTokenAssets && importedTokenAssets?.length > 0
        ? importedTokenAssets
        : DEFAULT_IMPORTED_TOKEN_ASSETS,
    ),
    publishReplay(1),
    refCount(),
  );

export const importTokenAsset = (assets: AssetInfo | AssetInfo[]): void => {
  importedTokenAssets$.pipe(first()).subscribe((oldImportedTokenAssets) => {
    localStorageManager.set(
      IMPORTED_TOKEN_ASSETS_KEY,
      oldImportedTokenAssets.concat(
        assets instanceof Array ? assets.map((i) => i.id) : assets.id,
      ),
    );
  });
};

export const filterUnavailablePools = (
  ammPools: AmmPool[],
): Observable<AmmPool[]> =>
  combineLatest([defaultTokenList$, importedTokenAssets$]).pipe(
    map(([defaultTokenList, importedTokens]) =>
      ammPools.filter(
        (ap) =>
          (importedTokens.includes(ap.x.asset.id) ||
            defaultTokenList.tokensMap.has(ap.x.asset.id)) &&
          (importedTokens.includes(ap.y.asset.id) ||
            defaultTokenList.tokensMap.has(ap.y.asset.id)),
      ),
    ),
  );

export const filterAvailablePools = (
  ammPools: AmmPool[],
): Observable<AmmPool[]> =>
  combineLatest([defaultTokenList$, importedTokenAssets$]).pipe(
    map(([defaultTokenList, importedTokens]) =>
      ammPools.filter(
        (ap) =>
          (!importedTokens.includes(ap.x.asset.id) &&
            !defaultTokenList.tokensMap.has(ap.x.asset.id)) ||
          (!importedTokens.includes(ap.y.asset.id) &&
            !defaultTokenList.tokensMap.has(ap.y.asset.id)),
      ),
    ),
  );

export const filterUnavailableTokenAssets = (
  assets: AssetInfo[],
): Observable<AssetInfo[]> =>
  combineLatest([defaultTokenList$, importedTokenAssets$]).pipe(
    map(([defaultTokenList, importedTokens]) =>
      assets.filter(
        (ai) =>
          (importedTokens.includes(ai.id) ||
            defaultTokenList.tokensMap.has(ai.id)) &&
          (importedTokens.includes(ai.id) ||
            defaultTokenList.tokensMap.has(ai.id)),
      ),
    ),
  );

export const filterAvailableTokenAssets = (
  assets: AssetInfo[],
): Observable<AssetInfo[]> =>
  combineLatest([defaultTokenList$, importedTokenAssets$]).pipe(
    map(([defaultTokenList, importedTokens]) =>
      assets.filter(
        (ai) =>
          !importedTokens.includes(ai.id) &&
          !defaultTokenList.tokensMap.has(ai.id) &&
          !importedTokens.includes(ai.id) &&
          !defaultTokenList.tokensMap.has(ai.id),
      ),
    ),
  );
