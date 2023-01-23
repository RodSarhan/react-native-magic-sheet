import React, { PropsWithChildren } from 'react';
import { useBottomSheetLayoutContext } from './BottomSheetContextProvider';
import { BottomSheetView } from '@gorhom/bottom-sheet';

export const BottomSheetAdaptiveView: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const layoutContext = useBottomSheetLayoutContext();

  return (
    <BottomSheetView onLayout={layoutContext?.handleContentLayout}>
      {children}
    </BottomSheetView>
  );
};
