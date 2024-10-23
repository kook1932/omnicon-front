// src/components/BannerSlider.js

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './BannerSlider.module.css';

export default function BannerSlider({ banners }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const showSlide = (index) => {
    if (banners.length === 0) return;
    if (index >= banners.length) {
      setCurrentIndex(0);
    } else if (index < 0) {
      setCurrentIndex(banners.length - 1);
    } else {
      setCurrentIndex(index);
    }
  };

  const handleBannerClick = (linkUrl) => {
    router.push(linkUrl);
  };

  return (
    <div className={styles.slider}>
      <div
        className={styles.slides}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div
            className={styles.slide}
            key={index}
            onClick={() => handleBannerClick(banner.linkUrl)}
          >
            <Image
              src={banner.imageUrl}
              alt={banner.title}
              width={800}
              height={400}
              objectFit="cover"
            />
            <div className={styles.bannerContent}>
              <h2>{banner.title}</h2>
              <p>{banner.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* 슬라이더 내비게이션 버튼 */}
      <div className={styles.sliderNav}>
        <button onClick={() => showSlide(currentIndex - 1)}>
          &#10094; 이전
        </button>
        <button onClick={() => showSlide(currentIndex + 1)}>
          다음 &#10095;
        </button>
      </div>
    </div>
  );
}