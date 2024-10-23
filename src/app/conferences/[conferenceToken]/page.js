// src/app/conferences/[conferenceToken]/page.js

import styles from './conferenceDetail.module.css';

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

  const conference = await res.json();

  return (
    <div className={styles.container}>
      <h1>{conference.name}</h1>
      <p>{conference.description}</p>
      <p>
        장소: {conference.location}, 날짜: {conference.startDate} ~{' '}
        {conference.endDate}
      </p>
      <p>
        웹사이트: <a href={conference.websiteUrl}>{conference.websiteUrl}</a>
      </p>
      {/* 컨퍼런스 관련 추가 정보 */}
    </div>
  );
}