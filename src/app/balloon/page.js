'use client';

import { useEffect, useRef, useState } from 'react';

export default function BalloonGame() {
  const gameAreaRef = useRef(null);
  const scoreRef = useRef(0); // ✅ 用來追蹤最新的分數
  const [score, setScore] = useState(0);
  const [balloonCount, setBalloonCount] = useState(0);

  const styles = {
    container: {
      textAlign: 'center',
      paddingTop: '20px',
      background: "url('/balloon/background.jpg') no-repeat center center",
      backgroundSize: 'cover',
      minHeight: '100vh',
    },
    score: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333',
    },
    gameArea: {
      position: 'relative',
      width: '100%',
      height: '500px',
      margin: '0 auto',
      overflow: 'hidden',
      border: '2px solid #ccc',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    balloon: {
      position: 'absolute',
      width: '60px',
      height: '80px',
      backgroundColor: '#E43737',
      borderRadius: '50% 50% 45% 45%',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
  };

  useEffect(() => {
    let timeoutId;
    const gameArea = gameAreaRef.current;

    function createBalloon() {
      const balloon = document.createElement('div');
      Object.assign(balloon.style, styles.balloon);
      balloon.style.top = Math.random() * 420 + 'px';
      balloon.style.left = Math.random() * (window.innerWidth - 60) + 'px';

      balloon.onmouseenter = () => {
        balloon.style.transform = 'scale(1.2)';
      };
      balloon.onmouseleave = () => {
        balloon.style.transform = 'scale(1)';
      };

      balloon.onclick = () => {
        gameArea.removeChild(balloon);
        scoreRef.current += 1; // ✅ 更新 ref 的值
        setScore(scoreRef.current); // ✅ 更新畫面上的分數
        setBalloonCount((prev) => {
          const next = prev + 1;
          if (next < 15) createBalloon();
          return next;
        });
      };

      gameArea.appendChild(balloon);
    }

    function startGame() {
      scoreRef.current = 0; // ✅ 重設分數
      setScore(0);
      setBalloonCount(0);
      gameArea.innerHTML = '';
      createBalloon();

      timeoutId = setTimeout(() => {
        alert(`遊戲結束！你射中了 ${scoreRef.current} 顆氣球`); // ✅ 正確使用最新的分數
        gameArea.innerHTML = '';
      }, 5000);
    }

    startGame();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.score}>得分：{score}</div>
      <div ref={gameAreaRef} style={styles.gameArea}></div>
    </div>
  );
}
