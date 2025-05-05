import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import SongCard from '@/components/SongCard';
import { LinearGradient } from 'expo-linear-gradient';
import AudioPlayer from '@/components/AudioPlayer';
//import { Songs } from '@/constants';

export default function HomeScreen() {
    const [index, setIndex] = useState(0);

    return (
        <LinearGradient
            colors={['#001f3f', '#000000']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1 }}
        >
            <View className='flex-1 justify-center items-center'>
                <SongCard
                    title='Apple Pie'
                    album='Rodeo'
                    artist='Travis Scott'
                    coverArt=''
                />
                <AudioPlayer 
                    uri="https://eymzcszvdisrxqnzpwsj.supabase.co/storage/v1/object/public/songs//Apple%20Pie.mp3"
                    startTime={44}
                />
            </View>
        </LinearGradient>
    );
};