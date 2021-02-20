import * as React from 'react';
import { useEffect, useState } from 'react';

type Props = {
  rect?: DOMRect
};

export function Blikvanger({ rect }: Props) {
  const [visibleRect, setVisibleRect] = useState<DOMRect>();

  useEffect(() => {
    if (rect) {
      setVisibleRect(rect);
    }
  }, [rect, setVisibleRect]);

  return (
    <div
      className="blikvanger"
      style={visibleRect ? {
        top: visibleRect.top + window.scrollY,
        left: visibleRect.left + window.scrollX,
        width: visibleRect.width,
        height: visibleRect.height
      } : {}}
      aria-hidden={true}
      data-visible={!!rect}
      onTransitionEnd={(e) => !rect && e.propertyName === 'opacity' && setVisibleRect(undefined)}
    />
  );
}
