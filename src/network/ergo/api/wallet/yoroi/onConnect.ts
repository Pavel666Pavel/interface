import { notification } from '@ergolabs/ui-kit';
import Cookies from 'js-cookie';

import { MESSAGE_COOKIE } from './common';

export const onConnect = (): void => {
  if (Cookies.get(MESSAGE_COOKIE)) {
    return undefined;
  }
  Cookies.set(MESSAGE_COOKIE, 'true', { expires: 1 });

  notification.info({
    message: 'Yoroi Wallet tip',
    description:
      'Keep Yoroi Wallet extension window open, when you use Spectrum.DEX. So that it will sync faster.',
  });
};
