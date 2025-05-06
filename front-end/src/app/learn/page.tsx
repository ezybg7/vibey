'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LearnMore() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 flex items-center justify-center">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          variants={itemVariants}
        >
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <span className="text-green-500">Vibey</span>
          </Link>
        </motion.h1>

        <motion.div 
          className="space-y-6"
          variants={itemVariants}
        >
          <section className="bg-white/5 p-6 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">What is Vibey?</h2>
            <p className="text-gray-300">
              Vibey is a modern music discovery platform that helps you find new music through an 
              intuitive, swipeable interface. Think of it as a dating app, but for music!
            </p>
          </section>

          <section className="bg-white/5 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">How It Works</h2>
            <div className="flex justify-center items-center gap-16">
              <motion.div 
                className="flex flex-col items-start text-left relative"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.5, delay: 0.1 }
                  }
                }}
              >
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-sm font-bold absolute -left-4 -top-4">
                  1
                </div>
                <span className="text-gray-300 text-2xl px-4 py-2">Login</span>
              </motion.div>

              <motion.div 
                className="flex flex-col items-start text-left relative"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.5, delay: 0.2 }
                  }
                }}
              >
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-sm font-bold absolute -left-4 -top-4">
                  2
                </div>
                <span className="text-gray-300 text-2xl px-4 py-2">Swipe</span>
              </motion.div>

              <motion.div 
                className="flex flex-col items-start text-left relative"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.5, delay: 0.3 }
                  }
                }}
              >
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-sm font-bold absolute -left-4 -top-4">
                  3
                </div>
                <span className="text-gray-300 text-2xl px-4 py-2">Save</span>
              </motion.div>
            </div>
          </section>
        </motion.div>

        <motion.div 
          className="mt-12 flex justify-center"
          variants={itemVariants}
        >
          <Link 
            href="/login"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}