"use client";
import useSWR from "swr";
import { newsFetcher } from "@/lib/fetcher";
import { useTheme } from "@/context/ThemeContext";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const { error, isLoading } = useSWR("header:technology:1:50", newsFetcher);
  const { theme } = useTheme();
  const pathname = usePathname();


  const navItems = [
    { name: "Home", href: "/" },
    { name: "Latest Dev News", href: "/#latest" },
    { name: "Latest Gen News", href: "/#latestGenNews" },
    { name: "Categories", href: "/#categories" },
    { name: "Favorites", href: "/favorites" },
  ];

  //! LOADING SECTION
  if (isLoading) {
    return (
      <div>
        <header className={`border-solid border-b-2 bg-inherit w-full relative overflow-hidden `}>
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative">
            <div className="text-3xl font-extrabold tracking-tight">
              <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Stack</span>
              <span className='text-cyan'>News</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-6 text-base font-semibold">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className={`cursor-pointer transition-colors duration-200 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                >
                  {item.name === "Favorites" ? (
                    <div className="flex items-center gap-1">
                      <BookmarkIcon className="w-4 h-4" />
                      <span>Favorites</span>
                    </div>
                  ) : (
                    item.name
                  )}
                </div>
              ))}
            </nav>
          </div>
        </header>

      </div>
    );
  }

  //! ERROR SECTION
  if (error) {
    return (
      <div>
        <header className={`border-solid border-b-2 bg-inherit w-full relative overflow-hidden`}>
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative">
            <div className="text-3xl font-extrabold tracking-tight">
              <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Stack</span>
              <span className={theme === 'dark' ? 'text-[#7b7b7b]' : 'text-cyan'}>News</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-6 text-base font-semibold">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className={`cursor-pointer transition-colors duration-200 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                >
                  {item.name === "Favorites" ? (
                    <div className="flex items-center gap-1">
                      <BookmarkIcon className="w-4 h-4" />
                      <span>Favorites</span>
                    </div>
                  ) : (
                    item.name
                  )}
                </div>
              ))}
            </nav>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className={`text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <h2 className="text-2xl font-bold mb-4">Error Loading News</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Please try again later
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className={`border-solid border-b-1 w-full relative overflow-hidden`}>
        {/* Top Navigation Bar */}
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative">
          {/* Branding */}
          <Link href="/" className="text-3xl font-extrabold tracking-tight">
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Stack</span>
            <span className='text-cyan-600'>News</span>
          </Link>
          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 text-base font-semibold">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`cursor-pointer transition-colors duration-200 ${pathname === item.href
                  ? 'text-cyan-500'
                  : theme === 'dark'
                    ? 'text-white hover:text-cyan-500'
                    : 'text-gray-900 hover:text-cyan-500'
                  }`}
              >
                {item.name === "Favorites" ? (
                  <div className="flex items-center gap-1">
                    <BookmarkIcon className="w-4 h-4" />
                    <span>Favorites</span>
                  </div>
                ) : (
                  item.name
                )}
              </Link>
            ))}
          </nav>
        </div>
      </header>

    </div>
  );
}
