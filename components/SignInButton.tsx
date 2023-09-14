'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import {
  UserIcon,
  Cog8ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import GoogleSignInButton from './GoogleSignInButton';

const SignInButton = () => {
  const { data: session } = useSession();
  const username: string | null | undefined = session?.user?.name ?? 'guest';

  return (
    <>
      {session?.user ? (
        <Menu as="div" className="relative flex items-center bg-white">
          <Menu.Button>
            {session?.user?.image ? (
              <div className="relative h-9 w-9">
                <Image
                  src={session.user.image}
                  alt={username}
                  className="inline-block rounded-full"
                  fill
                />
              </div>
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full border">
                <UserIcon className="header__icon h-4 w-4" />
              </div>
            )}
          </Menu.Button>
          <Transition
            enter="transition duration-150 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-150 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items className="absolute right-0 mt-1 flex w-80 origin-top-right flex-col rounded-xl bg-white pb-2 pt-4 text-white shadow-lg focus:outline-none dark:bg-white dark:text-white">
              <div className="mb-4 flex items-center gap-4 px-6 text-xs">
                {session?.user?.image ? (
                  <div className="relative h-10 w-10">
                    <Image
                      src={session.user.image}
                      alt={username}
                      className="inline-block rounded-full"
                      fill
                    />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border">
                    <UserIcon className="header__icon h-4 w-4" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-stone-600">
                    {session.user.name || 'Guest'}
                  </p>
                  <p className="text-stone-400">{session.user.email}</p>
                </div>
              </div>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/profile"
                    className={`${
                      active && 'bg-stone-700/50 dark:bg-stone-200'
                    } group inline-flex items-center gap-6 px-8 py-3 text-xs text-stone-400 dark:text-stone-500`}
                  >
                    <Cog8ToothIcon className="h-5 w-5 text-stone-400 group-hover:text-white" />
                    <span className="group-hover:text-white">
                      Manage Account
                    </span>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && 'bg-stone-700/50 dark:bg-stone-200'
                    } group inline-flex items-center gap-6 px-8 py-3 text-xs text-stone-400  dark:text-stone-500`}
                    onClick={() => signOut()}
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 text-stone-400 group-hover:text-white" />
                    <span className="group-hover:text-white">Sign Out</span>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <GoogleSignInButton />
      )}
    </>
  );
};

export default SignInButton;
