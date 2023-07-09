'use client';
import React from 'react';
import { Button } from '../ui/button';
import { Icons } from '../Icons';

export default function OAuthSignin() {
  const provider = [
    {
      provider: 'google',
    },
    {
      provider: 'facebook',
    },
    {
      provider: 'discord',
    },
  ];
  return (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-2 md:gap-3 lg:grid-cols-3">
      {provider.map((item, index) => {
        return (
          <Button
            aria-label={`Sign in with ${item.provider}`}
            key={index}
            variant="outline"
            className="w-full bg-background sm:w-auto"
          >
            <Icons.google className="mr-2 h-4 w-4" aria-hidden="true" />
            {item.provider}
          </Button>
        );
      })}
    </div>
  );
}
