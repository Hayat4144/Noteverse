import React, { Fragment } from 'react';
import { AspectRatio } from '../ui/aspect-ratio';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function WelcomeMessage() {
  const session = await getServerSession(authOptions);
  let current_time = new Date();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Get the day, month, and year components
  const dayOfWeek = days[current_time.getDay()];
  const month = months[current_time.getMonth()];
  const year = current_time.getFullYear();
  const formattedDate = `${dayOfWeek}, ${month}, ${year}`;

  const getGreeting = () => {
    const hour = current_time.getHours();
    if (hour < 12) {
      return 'Good morning';
    } else if (hour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  const greeting = getGreeting();
  return (
    <Fragment>
      <div className="w-full relative">
        <AspectRatio ratio={10 / 2.5}>
          <Image src={'/image/wallpaper.jpg'} fill alt="pic" priority />
        </AspectRatio>
        <section className="md:mx-5 mx-2 my lg:mx-10 dark:text-gray-100 absolute top-4">
          <div className="welcome_message flex space-x-2 text-2xl">
            <h1 className="welcome_text">{greeting},</h1>
            <span className="user_name cursor-pointer">
              {session?.user.name}
            </span>
          </div>
          <p>{formattedDate}</p>
        </section>
      </div>
    </Fragment>
  );
}
