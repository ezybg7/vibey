'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuMusic } from 'react-icons/lu';
import { FaRegFolder } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

export default function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/discover', Icon: LuMusic },
    { href: '/playlists', Icon: FaRegFolder },
    { href: '/profile', Icon: CgProfile },
  ];

  return (
    <div
      className="w-fit flex flex-row py-[12px] px-[24px] gap-[30px] justify-between items-center rounded-full"
      style={{
        backgroundColor: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {navItems.map(({ href, Icon }) => {
        const isActive = pathname === href;
        return (
          <Link key={href} href={href}>
            <div
              className={`p-2 rounded-full transition-colors ${
                isActive ? 'bg-blue-500' : ''
              }`}
            >
              <Icon
                size={32}
                className={isActive ? 'text-white' : 'text-gray-600'}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
