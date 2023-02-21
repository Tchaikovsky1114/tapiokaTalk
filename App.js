import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigator/AppNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          "black": require("./assets/fonts/NotoSansKR-Black.otf"),
          "bold": require("./assets/fonts/NotoSansKR-Bold.otf"),
          "Regular": require("./assets/fonts/NotoSansKR-Regular.otf"),
          "Medium": require("./assets/fonts/NotoSansKR-Medium.otf"),
          "Thin": require("./assets/fonts/NotoSansKR-Thin.otf"),
          "Light": require("./assets/fonts/NotoSansKR-Light.otf"),
        })  
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsLoaded(true)
      }
      
    }
    prepare();
  },[])

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  },[appIsLoaded])

  if(!appIsLoaded) {
    return null;
  }

  return (
      <SafeAreaProvider onLayout={onLayout} >
        <AppNavigator />
      </SafeAreaProvider>
  );
}

