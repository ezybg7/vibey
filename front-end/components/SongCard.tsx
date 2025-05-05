import { View, Text, Image } from 'react-native';

interface SongCardProps {
    title: string;
    artist: string;
    album: string;
    coverArt: string; // url to the song cover art
};

export default function SongCard({
    title,
    album,
    artist,
    coverArt
}: SongCardProps) {
    return (
        <View className='flex flex-col outline outline-black'>
            <Image
                source={require('../assets/images/Rodeo.png')}
                className='w-[400px] h-[400px]'
                resizeMode='contain'
            />
            <View className='flex flex-row justify-between bg-gray-800 px-[20px] py-[15px]'>
                <View className='flex flex-col gap-[10px]'>
                    <Text className='text-white font-bold'>{title}</Text>
                    <Text className='text-gray-400'>{artist}</Text>
                </View>
                <Text>dislike/like</Text>
            </View>
        </View>
    );
};