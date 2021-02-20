import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { Blikvanger } from './Blikvanger';

type Props = {
  className?: string
};

export function Blik({ className }: Props) {
  const [active, setActive] = useState(false);
  const [rect, setRect] = useState<DOMRect>();
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      setActive(true);
    }
  }, [setActive]);
  const onFocus = useCallback((e: FocusEvent) => {
    if (e.target instanceof HTMLElement) {
      setRect(e.target.getBoundingClientRect());
    }
  }, [setRect]);
  const onClick = useCallback(() => setActive(false), [setActive]);
  const onBlur = useCallback(() => setRect(undefined), [setRect]);
  const onResize = useCallback(() => requestAnimationFrame(() => {
    const current = document.activeElement;

    if (current) {
      setRect(current.getBoundingClientRect());
    }
  }), [setRect]);

  useEffect(() => {
    document.addEventListener('keydown', onKey);
    document.addEventListener('focusin', onFocus);
    document.addEventListener('mousedown', onClick);
    window.addEventListener('blur', onBlur);
    window.addEventListener('resize', onResize);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('mousedown', onClick);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('resize', onResize);
    };
  }, [onKey, onFocus, onClick, onBlur, onResize]);

  return (
    <Blikvanger className={className} rect={active ? rect : undefined}/>
  );
}
