import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        {children}
        <div className='sticky bottom-0 left-0 w-full flex justify-center items-center pb-[30px]'>
          <Navbar/>
        </div>
    </div>
  );
}
