import { View, SafeAreaView, Text } from 'react-native';
import ActionButton from '@/components/ActionButton';

export default function AppScreen() {
    return (
        <ActionButton text="Get Started">
            <SafeAreaView className='flex-1'>
                <View className='flex-1 justify-center items-center'>
                    {[...Array(6)].map((_, i) => (
                        <Text key={i}>Hey hungry, I am Ayman</Text>
                    ))}
                </View>
            </SafeAreaView>
        </ActionButton>
    );
}

