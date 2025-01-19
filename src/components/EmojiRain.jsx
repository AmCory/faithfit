import React, { useEffect } from 'react';

    const Emojis = ['💪', '✝️'];

    function EmojiRain() {
      useEffect(() => {
        const createDrop = () => {
          const emoji = Emojis[Math.floor(Math.random() * Emojis.length)];
          const drop = document.createElement('div');
          drop.classList.add('emoji-drop');
          drop.textContent = emoji;
          drop.style.left = `${Math.random() * 100}%`;
          drop.style.animationDelay = `${Math.random() * 5}s`;
          drop.style.top = `${Math.random() * -100}vh`;
          document.querySelector('.emoji-rain').appendChild(drop);

          drop.addEventListener('animationend', () => {
            drop.remove();
          });
        };

        const interval = setInterval(createDrop, 1000);

        return () => clearInterval(interval);
      }, []);

      return <div className="emoji-rain" />;
    }

    export default EmojiRain;
