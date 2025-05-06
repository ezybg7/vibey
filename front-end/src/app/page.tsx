'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
	
	// Text animation variants
	const textVariants = {
		hidden: {
			opacity: 0,
			scale: 0.8,
			filter: "blur(8px)",
		},
		visible: {
			opacity: 1,
			scale: 1,
			filter: "blur(0px)",
			transition: {
				duration: 0.8,
				ease: "easeOut",
			}
		}
	};
	
	// Stagger the animations
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2
			}
		}
	};


  const handleLogin = () => {
    router.push('/playlists');
  };

  const handleSignup = () => {
    router.push('/playlists');
  };

  return (
    <div>
			<div className='flex h-screen justify-center items-center px-[100px] gap-[100px]'>
				<div className='flex flex-row gap-[70px] w-full'> 
					<motion.div 
						className='flex flex-col justify-center gap-[30px]'
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						<motion.h1 variants={textVariants} className='text-[90px]'>
							Discover new music
						</motion.h1>
						
						<motion.h5 variants={textVariants} className='text-[34px]'>
							Easily uncover music you potentially like in a tinder like swipable experience!
						</motion.h5>
						
						<motion.div 
							className='flex flex-row gap-[50px]'
							variants={textVariants}
						>
			  <a 
                  className={`flex items-center justify-center shadow-lg  ${false ? 'bg-white text-black' : 'bg-black text-white'} rounded-[10px] py-[12px] px-[20px] ${false ? 'w-full' : 'w-fill'}`}
                  href='/login'
              >
                <p className='font-light text-[24px]'>
                  Get Started
                </p>
              </a>
							<a 
                  className={`flex items-center justify-center bg-white outline-gray-400 outline-[1px] shadow-lg rounded-[10px] py-[12px] px-[20px] ${false ? 'w-full' : 'w-fill'}`}
                  href='/about'
              >
                <p className='font-light text-black text-[24px]'>
                 Learn More
                </p>
              </a>
						</motion.div>
					</motion.div>
			</div>
			<div className='w-full ml-[10px] mr-[-50px]' ref={containerRef}>
                <Image 
                    width={906}
                    height={512}
                    src="/landingpageImage.webp" 
                    alt="vibey yas" 
                    className="rounded-xl shadow-xl"
                />
			</div>
		</div>
    </div>
  );
}
