'use client';

import { Check, Copy, Facebook, Share2, Twitter } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-neutral-gray-600 dark:text-neutral-gray-400 hover:text-deep-navy dark:hover:text-white transition-colors"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 top-full mt-2 bg-white dark:bg-deep-navy-800 border-2 border-neutral-gray-200 dark:border-neutral-gray-700 rounded-lg shadow-xl p-3 z-20 min-w-[200px]">
            <div className="space-y-2">
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-700 rounded-lg transition-colors"
              >
                <Facebook className="w-5 h-5 text-blue-600" />
                <span className="text-sm">Facebook</span>
              </a>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-700 rounded-lg transition-colors"
              >
                <Twitter className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Twitter</span>
              </a>
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-700 rounded-lg transition-colors"
              >
                <span className="text-xl">📱</span>
                <span className="text-sm">WhatsApp</span>
              </a>
              <button
                onClick={copyLink}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-700 rounded-lg transition-colors"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
                <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
