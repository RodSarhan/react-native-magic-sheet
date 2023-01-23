import React, { ReactNode } from 'react';
import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';

export type SheetContent = React.FC | ReactNode;

export type NewSheetProps = Partial<BottomSheetModalProps>;

/**
 * @description Show a sheet. If a sheet is already present, it will close it first before displaying.
 * @param newContent Recieves a function that returns a sheet component.
 * @param newProps Recieves {@link NewSheetProps}  to override the default configs.
 * @returns {Promise<any>} Returns a Promise that resolves with the {@link hide} props when the sheet is closed. If the sheet is dismissed it will resolve to undefined.
 */
const show = async (
  newContent: SheetContent,
  newProps?: NewSheetProps
): Promise<any> => magicSheetRef.current?.show?.(newContent, newProps);

/**
 * @description Hide the current sheet.
 * @param args Those args will be passed to the {@link show} resolve function.
 * @returns {Promise<void>} Returns a promise that resolves when hide happens.
 */
const hide = async (args?: any): Promise<void> =>
  magicSheetRef.current?.hide?.(args);

export interface TMagicSheet {
  show: typeof show;
  hide: typeof hide;
}

export const magicSheetRef = React.createRef<TMagicSheet>();

/**
 * @example
 * ```js
 * // ...
 * import { magicSheet } from 'react-native-magic-sheet';
 *
 * // ...
 * const ExampleContent = () => (
 *  <TouchableOpacity onPress={() => magicSheet.hide("hey")}>
 *    <Text>Test!</Text>
 *  </TouchableOpacity>
 * )
 *
 * const result = await magicSheet.show(ExampleContent or ()=><ExampleContent {...someProps}/>);
 * console.log(result); // Returns 'hey' when the sheet is closed by the TouchableOpacity.
 * ```
 */
export const magicSheet = {
  show,
  hide,
};
