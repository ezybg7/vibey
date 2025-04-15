import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';

interface ActionButtonProps {
    children: React.ReactNode;
    text: string;
    onPress: () => void;
};

export default function ActionButton({ children, text, onPress }: ActionButtonProps) {
    const router = useRouter();

    return (
        <View className='flex-1'>
            {children}
            <View className='absolute bottom-[65px] w-full px-[50px]'>
                <TouchableOpacity 
                    className='bg-black py-[20px] rounded-full justify-center items-center w-full'
                    onPress={onPress}
                >
                    <Text className='text-white'>{text}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
