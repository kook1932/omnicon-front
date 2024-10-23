// src/components/CardList.js
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './CardList.module.css';

export default function CardList({ cards }) {
  const router = useRouter();

  const handleCardClick = (videoToken) => {
    // videoToken을 이용하여 해당 URL로 이동
    router.push(`/videos/${videoToken}`);
  };

  return (
    <div className={styles.cardList}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={styles.card}
          onClick={() => handleCardClick(card.videoToken)} // 클릭 이벤트 추가
        >
          <Image
            src={card.thumbnailUrl}
            alt={card.title}
            width={300}
            height={200}
            objectFit="cover"
            className={styles.cardImage}
          />
          <div className={styles.cardContent}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}