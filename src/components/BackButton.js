// src/components/BackButton.js

'use client';

import { useRouter } from 'next/navigation';
import styles from './BackButton.module.css';

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button onClick={handleBack} className={styles.backButton}>
      ← 뒤로 가기
    </button>
  );
}
