// src/components/Slider.js

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Slider.module.css';

export default function Slider({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const showSlide = (index) => {
    if (slides.length === 0) return;
    if (index >= slides.length) {
      setCurrentIndex(0);
    } else if (index < 0) {
      setCurrentIndex(slides.length - 1);
    } else {
      setCurrentIndex(index);
    }
  };

  const handleSlideClick = (videoToken) => {
    router.push(`/videos/${videoToken}`);
  };

  return (
    <div className={styles.slider}>
      <div
        className={styles.slides}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            className={styles.slide}
            key={index}
            onClick={() => handleSlideClick(slide.videoToken)}
          >
            <Image
              src={slide.thumbnailUrl}
              alt="컨퍼런스 썸네일"
              width={800}
              height={400}
              objectFit="cover"
            />
            <h3>{slide.title}</h3>
            <p>연사: {slide.speaker || '정보 없음'}</p>
            <p>요약: {slide.description}</p>
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