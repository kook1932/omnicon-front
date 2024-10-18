// src/app/page.js

import Slider from '../components/Slider';
import styles from './page.module.css';

export default async function Home() {
  // 서버 컴포넌트에서 데이터 가져오기
  const res = await fetch('http://localhost:8080/api/v1/search/video', {
    cache: 'no-store',
  });
  const json = await res.json();

  const slidesData = json.data || [];

  const slides = slidesData.map((video) => ({
    title: video.title,
    speaker: '', // 연사 정보가 없으므로 빈 문자열로 설정
    description: video.description,
    thumbnailUrl: video.thumbnailUrl || '/default-thumbnail.jpg',
    youtubeVideoId: video.youtubeVideoId,
  }));

  return (
    <div>
      {/* 헤더 영역 */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <h1>컨퍼런스 플랫폼</h1>
          </div>
          <div>
            <a href="#">홈</a>
            <a href="#">컨퍼런스</a>
            <a href="#">커뮤니티</a>
            <a href="#">로그인</a>
          </div>
        </nav>
        {/* 검색 기능 추가 */}
        <div className={styles.searchBar}>
          <input type="text" placeholder="요약본 검색..." />
          <button>검색</button>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className={styles.main}>
        {/* 최신 및 인기 컨퍼런스 섹션 */}
        <section>
          <h2 className={styles.sectionTitle}>최신 및 인기 컨퍼런스 요약</h2>

          {/* 슬라이더 컴포넌트 */}
          <Slider slides={slides} />
        </section>

        {/* 추가 섹션은 필요에 따라 추가하세요 */}
      </main>

      {/* 푸터 영역 */}
      <footer className={styles.footer}>
        회사 정보 | 이용 약관 | 개인정보 처리방침 |{' '}
        <a href="#" style={{ color: '#ecf0f1' }}>
          문의하기
        </a>
      </footer>
    </div>
  );
}