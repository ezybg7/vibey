import { View, SafeAreaView, Text } from 'react-native';
import ActionButton from '@/components/ActionButton';
import { useRouter } from 'expo-router';

export default function AppScreen() {
    const router = useRouter();

    return (
        <ActionButton text="Get Started" onPress={() => {router.push('/login')}}>
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

