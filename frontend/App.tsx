import { useFonts} from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { Paragraph, Spacer, TamaguiProvider, Theme, YStack } from 'tamagui'

import config from './tamagui.config'
import HomePage from './components/HomePage/HomePage'
import NavigationRegLog from './components/NavigationRegLog/NavigationRegLog'



export default function App() {
  const colorScheme = useColorScheme()
  
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) {
    return null
  }


  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
        <YStack f={1} jc="center" ai="center" backgroundColor={'$backgroundSoft'}>
          <Paragraph color="$color" jc="center">
            <NavigationRegLog />
          </Paragraph>
          <StatusBar style="auto" />
        </YStack>
      </Theme>
    </TamaguiProvider>
  )
}
