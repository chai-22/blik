import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { Blikvanger } from './Blikvanger';

type Props = {
  className?: string
};

export function Blik({ className }: Props) {
  const [rect, setRect] = useState<DOMRect>();
  const onFocus = useCallback((e: FocusEvent) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    setRect(e.target.getBoundingClientRect());
  }, [setRect]);
  const onBlur = useCallback((e: Event) => {
    if (e instanceof MouseEvent && e.target === document.activeElement) {
      return;
    }

    setRect(undefined);
  }, [setRect]);
  const onResize = useCallback(() => requestAnimationFrame(() => {
    const current = document.activeElement;

    if (!current) {
      return;
    }

    setRect(current.getBoundingClientRect());
  }), [setRect]);

  useEffect(() => {
    document.addEventListener('focusin', onFocus);
    document.addEventListener('mousedown', onBlur);
    window.addEventListener('blur', onBlur);
    window.addEventListener('resize', onResize);

    return () => {
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('mousedown', onBlur);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('resize', onResize);
    };
  }, [onFocus, onBlur]);

  return (
    <Blikvanger className={className} rect={rect}/>
  );
}
