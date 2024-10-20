// src/app/videos/[videoToken]/page.js

import BackButton from '../../../components/BackButton';
import styles from './videoDetail.module.css';

export default async function VideoDetail({ params }) {
  const { videoToken } = params;

  // 서버 컴포넌트에서 데이터 패칭
  const res = await fetch(
    `http://localhost:8080/api/v1/videos/${videoToken}`,
    {
      cache: 'no-store',
    }
  );
  const json = await res.json();

  if (!res.ok) {
    return <div>비디오를 불러오는 중 오류가 발생했습니다.</div>;
  }

  const video = json.data;

  return (
    <div className={styles.container}>
      <BackButton />
      <h1 className={styles.title}>{video.title}</h1>
      <div className={styles.videoWrapper}>
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeVideoId}`}
          title={video.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <p className={styles.description}>{video.description}</p>
      <h2 className={styles.summaryTitle}>요약본</h2>
      <p className={styles.description}>
        {video.summary || '요약본이 없습니다.'}
      </p>
    </div>
  );
}
