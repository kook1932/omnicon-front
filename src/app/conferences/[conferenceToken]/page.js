// src/app/conferences/[conferenceToken]/page.js

import BackButton from '../../../components/BackButton';  // BackButton 컴포넌트 추가
import CardList from '../../../components/CardList';
import styles from './conferenceDetail.module.css';
import Image from 'next/image';

export default async function ConferenceDetail({ params }) {
  const { conferenceToken } = params;

  // 서버 컴포넌트에서 데이터 가져오기
  const res = await fetch(
    `http://localhost:8080/api/v1/conferences/${conferenceToken}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    return <div>컨퍼런스를 불러오는 중 오류가 발생했습니다.</div>;
  }

  const { data: conference } = await res.json();

  // 비디오 카드용 데이터 변환
  const videoCards = conference.videos.map((video) => ({
    title: video.title,
    description: video.description || 'No description available',
    thumbnailUrl: video.thumbnailUrl || '/default-thumbnail.jpg',
    videoToken: video.videoToken, // videoToken을 포함하여 카드 클릭 시 동작하도록 설정
  }));

  return (
    <div className={styles.container}>
      {/* 뒤로가기 버튼 */}
      <BackButton />

      {/* 컨퍼런스 기본 정보 */}
      <h1 className={styles.title}>{conference.name}</h1>
      <p className={styles.paragraph}>{conference.description}</p>
      <p className={styles.paragraph}>
        <strong>장소:</strong> {conference.location}
      </p>
      <p className={styles.paragraph}>
        <strong>날짜:</strong> {conference.startDate} ~ {conference.endDate}
      </p>
      <p className={styles.paragraph}>
        <strong>웹사이트:</strong>{' '}
        <a href={conference.websiteUrl} className={styles.link}>
          {conference.websiteUrl}
        </a>
      </p>

      {/* 호스트 정보 */}
      <section className={styles.hostSection}>
        <h2 className={styles.subtitle}>호스트 정보</h2>
        <div className={styles.hostInfo}>
          <Image
            src={`${conference.host.logoUrl}`}
            alt={conference.host.name}
            width={100}
            height={100}
            className={styles.hostLogo}
          />
          <div>
            <h3>{conference.host.name}</h3>
            <p>{conference.host.description}</p>
            <p>
              <strong>웹사이트:</strong>{' '}
              <a href={`${conference.host.websiteUrl}`} className={styles.link}>
                {conference.host.websiteUrl}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 비디오 리스트 */}
      <section className={styles.videoSection}>
        <h2 className={styles.subtitle}>비디오 리스트</h2>
        <CardList cards={videoCards} />
      </section>
    </div>
  );
}