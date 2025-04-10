import { useEffect } from 'react';
import { getTelegramWebApp } from './getTelegramWebApp';

export const useTelegram = () => {
  const tg = getTelegramWebApp();

  useEffect(() => {
    //@ts-ignore
    if (tg) tg.ready();
  }, [tg]);

  return tg;
};
