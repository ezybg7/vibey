import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';

interface ActionButtonProps {
    children: React.ReactNode;
    text: string;
};

export default function ActionButton({ children, text }: ActionButtonProps) {
    const router = useRouter();

    return (
        <View className='flex-1'>
            {children}
            <View className='absolute bottom-[65px] w-full px-[50px]'>
                <TouchableOpacity 
                    className='bg-black py-[20px] rounded-full justify-center items-center w-full'
                    onPress={() => router.push('/signup')}
                >
                    <Text className='text-white'>{text}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
