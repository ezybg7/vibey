import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import SongCard from '@/components/SongCard';

export default function HomeScreen() {
    return (
        <View className='flex-1 justify-center items-center'>
            <SongCard
                title='Apple Pie'
                album='Rodeo'
                artist='Travis Scott'
                coverArt=''
            />
        </View>
    );
};