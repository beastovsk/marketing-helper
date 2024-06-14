'use client';

import React from 'react';
import YouTube from 'react-youtube';
import s from './VideoPlayer.module.scss';

const VideoPlayer = () => {
  const videoId = '8j7Ds2FldGg'; // ID вашего видео
  const opts = {
    height: '500px',
    width: '100%',
    playerVars: {
      autoplay: 1
    }
  };

  const onReady = (event) => {
    // Доступ к объекту плеера.
    event.target.pauseVideo(); // Пример: автоматическое воспроизведение при загрузке страницы
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Что такое MH?</h1>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    </div>
  );
};

export default VideoPlayer;
