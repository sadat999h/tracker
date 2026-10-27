import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors, typography } from '@/theme/tokens';

const tabs = [
  { name: 'home',      title: 'Home',      icon: 'home-outline' as const,          active: 'home' as const },
  { name: 'track',     title: 'Track',     icon: 'record-circle-outline' as const,  active: 'record-circle' as const },
  { name: 'insights',  title: 'Insights',  icon: 'chart-bar' as const,             active: 'chart-bar' as const },
  { name: 'assistant', title: 'Assistant', icon: 'creation' as const,              active: 'creation' as const },
  { name: 'profile',   title: 'Profile',   icon: 'account-outline' as const,       active: 'account' as const },
] as const;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {
          headerShown: false,
          tabBarStyle: {
            height: 72,
            paddingTop: 8,
            backgroundColor: colors.surfaceLow,
            borderTopColor: colors.surfaceHigh,
          },
          // RN 0.79 changed NativeColorValue to include null on some platforms,
          // which conflicts with @react-navigation/bottom-tabs v7's string-only
          // tint prop types. The values are valid strings at runtime.
          tabBarActiveTintColor: colors.signal as any, // eslint-disable-line @typescript-eslint/no-explicit-any
          tabBarInactiveTintColor: colors.muted as any, // eslint-disable-line @typescript-eslint/no-explicit-any
          tabBarLabelStyle: { ...typography.labelSm, fontSize: 10 },
          tabBarItemStyle: { minHeight: 48 },
        }
      }
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? tab.active : tab.icon}
                color={color}
                size={21}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
