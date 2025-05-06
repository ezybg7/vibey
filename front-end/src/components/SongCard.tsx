import { song } from '@/types';
import { AiOutlineSpotify } from "react-icons/ai";

interface SongCardProps {
    song: song;
}

export default function SongCard({ song }: SongCardProps) {
    return (
        <div className=''>
            <img
                src='/Rodeo.png'
                alt='vibey'
                draggable={false}
                width={350}
                height={350}
            />
            <div className='flex flex-row justify-between bg-gray-800 px-[12px] py-[8px]'>
                <div className='flex flex-col gap-[4px]'>
                    <h6 className='font-bold text-[18px]'>{song.title}</h6>
                    <div className='flex flex-row gap-[4px] items-center'>
                        <AiOutlineSpotify className='text-gray-400' size={18}/>
                        <p className='text-[16px] text-gray-400'>
                            {song.artists.map((artist) => artist).join(', ')}
                        </p>
                    </div>
                </div>
                <div>
                    ...
                </div>
            </div>
        </div>
    );
};