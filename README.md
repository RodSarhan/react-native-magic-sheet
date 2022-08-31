![React Native Magic Sheet Cover](/docs/assets/banner.png)

_A Bottom Sheet library that can be called imperatively from anywhere!_

## React Native Magic Sheet 🪄 

Inspired by [react-native-magic-modal](https://gorhom.github.io/react-native-bottom-sheet/modal/) This library aims to solve the need to declaretively add bottom sheets to our screens by providing an imperative API that can be called from anywhere in the app (even outside of components) to show a fully customizeable bottom sheet with the ability to wait for it to resolve and get a response back.

This library relies on the modal component of [@gorhom/bottom-sheet](https://gorhom.github.io/react-native-bottom-sheet/modal/) and accepts the same props and children.

Therefore the setup proccess of [@gorhom/bottom-sheet](https://gorhom.github.io/react-native-bottom-sheet/modal/) should be followed in order for this to work

(ex: installing gesture handler, reanimated2, and @gorhom/bottom-sheet v4)

## 📸 Examples

| IOS                                                                                                                           | Android                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| <img src="/docs/assets/ios.gif" height=500/> | <img src="/docs/assets/android.gif" height=500/>  |

## 🛠 Installation

```sh
yarn add react-native-magic-sheet
```

## ⚙️ Usage

First, insert a `MagicSheetPortal` in the top of the application and make sure the app is wrapped with GestureHandlerRootView & BottomSheetModalProvider.

You can add the default props and styles of type BottomSheetProps (optional as you can override the props when calling the sheet later).

```js
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {MagicSheetPortal} from 'react-native-magic-sheet';

export default function App() {
  return (
    <OtherProviders>
        <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
                <MagicSheetPortal {...defaultProps}/>  // <-- On the top of the app component hierarchy
                <AppComponents /> // The rest of the app goes here
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    </OtherProviders>
  );
}
```

Then, you are free to use the `magicSheet` as shown from anywhere you want.

```js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { magicSheet } from 'react-native-magic-sheet';

const PickerSheet = (someProps) => (
  <View>
    <TouchableOpacity 
    onPress={() => {
        magicSheet.hide({userName: "Rod", id:1})
    }}> // This will hide the sheet, resolve the promise with the passed object
      <Text>Return user</Text>
    </TouchableOpacity>
  </View>
);

const handlePickUser = async () => {
  // We can call it with or without props, depending on the requirements.
  const result = await magicSheet.show(PickerSheet);

  //OR (with props)
  const result = await magicSheet.show(() => <PickerSheet {...someProps}/>);

  console.log(result) 
  // will show {userName: "Rod", id:1}, or undefined if sheet is dismissed
};

export const Screen = () => {
  return (
    <View>
      <TouchableOpacity onPress={handlePickUser}>
        <Text>Show sheet</Text>
      </TouchableOpacity>
    </View>
  );
};
```

Alternatively, if we don't care about waiting the resolved value of the promise we can just trigger some action instead.

```js
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {magicSheet} from 'react-native-magic-sheet';

const PickerSheet = (props) => (
  <View>
    <TouchableOpacity 
      onPress={() => {
        magicSheet.hide();
        props.onSelect({userName: "Rod", id:1})
      }}> 
      <Text>Return user</Text>
    </TouchableOpacity>
  </View>
);

export const Screen = () => {
  const [user, setUser] = useState();

  const handlePickUser = useCallback(
    () => {
      magicSheet.show(
        () => <PickerSheet onSelect={(value)=>{setUser(value)}}/>
      )
    }
  ,[])

  return (
    <View>
      <TouchableOpacity 
        onPress={handlePickUser}>
        <Text>Show sheet</Text>
      </TouchableOpacity>
    </View>
  );
};
```

magicSheet.show( ) can take another optional argument of type BottomSheetProps if we need to override the default props and style of the bottom sheet container

Example:
```js
magicSheet.show(
    () => <SomeComponent {...someProps}>,
    {backgroundStyle: styles.bottomSheetContainer}
)
```
## 😬 Notes

### Inner components
It's recommended to use the components provided by [@gorhom/bottom-sheet](https://gorhom.github.io/react-native-bottom-sheet/modal/) inside of the bottom sheet as those components are made to adapt to the bottom sheet behavior, especially scrollables and text inputs.

### Keyboard in android
If you face issues with android keyboard the easiest approach would be to replace 
```android:windowSoftInputMode="adjustResize"```
with
```android:windowSoftInputMode="adjustPan"```
in the manifest file to mimic the behavior of ios, or use whatever keyboard handling solution you're comfortable with.

This limitation is not specific to this library.

## 👨‍🏫 Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## ⚖️ License

[MIT](LICENSE)
