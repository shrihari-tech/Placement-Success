'use client';

import { useEffect } from 'react';

const FlipCard = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    const flippers = document.querySelectorAll('.card__flipper');
    const win = window;

    const flip = function (e) {
      e.preventDefault();
      const thisCard = this;
      const thisFlipper = thisCard.querySelector('.card__flipper');
      const rect = thisCard.getBoundingClientRect();
      const xc = win.innerWidth / 2;
      const yc = win.innerHeight / 2;
      const scrollY = window.scrollY;
      const cardW = thisCard.offsetWidth / 2;
      const cardH = thisCard.offsetHeight / 2;

      let transX = xc - rect.left - cardW;
      let transY = scrollY + yc - rect.top - cardH;

      if (win.innerWidth <= 700) transY = 0;

      // Unflip any already active card
      document.querySelectorAll('.card.active').forEach((card) => {
        if (card !== thisCard) {
          card.style.zIndex = '1';
          card.classList.remove('active');
        }
      });

      document.querySelectorAll('.card__flipper.active').forEach((flipper) => {
        flipper.style.transform = 'none';
        flipper.style.webkitTransform = 'none';
        flipper.style.msTransform = 'none';
        flipper.classList.remove('active');
      });

      // Activate this card
      thisCard.style.zIndex = '3';
      thisCard.classList.add('active');

      thisFlipper.style.transform = `translate3d(${transX}px, ${transY}px, 0) rotateY(180deg) scale(1)`;
      thisFlipper.style.webkitTransform = `translate3d(${transX}px, ${transY}px, 0) rotateY(180deg) scale(1)`;
      thisFlipper.style.msTransform = `translate3d(${transX}px, ${transY}px, 0) rotateY(180deg) scale(1)`;
      thisFlipper.classList.add('active');
    };

    const unflip = (e) => {
      if (!e.target.closest?.('.card')) {
        document.querySelectorAll('.card').forEach((card) => {
          card.style.zIndex = '1';
          card.classList.remove('active');
        });
        flippers.forEach((flipper) => {
          flipper.style.transform = 'none';
          flipper.style.webkitTransform = 'none';
          flipper.style.msTransform = 'none';
          flipper.classList.remove('active');
        });
      }
    };

    cards.forEach((card) => {
      card.addEventListener('click', flip);
    });

    win.addEventListener('click', unflip);

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('click', flip);
      });
      win.removeEventListener('click', unflip);
    };
  }, []);

  const players = [
    { name: 'Tony', lastName: 'Romo', num: '9', rating: '113.2', color: '#5271c2' },
    { name: 'Aaron', lastName: 'Rodgers', num: '12', rating: '112.2', color: '#35a541' },
    { name: 'Ben', lastName: 'Roethlisberger', num: '7', rating: '103.3', color: '#bdb235' },
    { name: 'Peyton', lastName: 'Manning', num: '18', rating: '101.5', color: '#db6623' },
    { name: 'Tom', lastName: 'Brady', num: '12', rating: '97.4', color: '#3e5eb3' },
    { name: 'Drew', lastName: 'Brees', num: '9', rating: '97.0', color: '#aa9e5c' },
  ];

  // Helper to generate long shadow (approximation)
  const generateLongShadow = (color) => {
    const darkenColor = (hex, percent) => {
      const num = parseInt(hex.replace('#', ''), 16);
      const amt = Math.round(2.55 * percent);
      const r = Math.max(0, ((num >> 16) & 0xff) - amt);
      const g = Math.max(0, ((num >> 8) & 0xff) - amt);
      const b = Math.max(0, (num & 0xff) - amt);
      return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
    };

    const darkColor = darkenColor(color, 15);
    let shadow = '';
    for (let i = 1; i <= 100; i++) {
      shadow += `${i}px ${i}px ${darkColor}`;
      if (i < 100) shadow += ', ';
    }
    return shadow;
  };

  return (
    <ul
      style={{
        margin: 0,
        padding: 0,
        listStyle: 'none',
        maxWidth: '800px',
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
        overflowX: 'hidden',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '30px',
        padding: '15px',
      }}
    >
      {players.map((player, index) => (
        <li
          key={index}
          className="card"
          style={{
            position: 'relative',
            width: 'calc(33.333% - 30px + 30px / 3)',
            height: '340px',
            margin: '0 30px 30px 0',
            perspective: '1000px',
            float: 'left',
            ...(index === 2 || index === 5 ? { marginRight: 0 } : {}),
          }}
        >
          <div
            className="card__flipper px-20"
            style={{
              cursor: 'pointer',
              transformStyle: 'preserve-3d',
              transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            {/* Front */}
            <div
              className="card__front"
              style={{
                position: 'absolute',
                backfaceVisibility: 'hidden',
                top: 0,
                left: 0,
                width: '100%',
                height: '340px',
                transform: 'rotateY(0deg)',
                zIndex: 2,
                background: player.color,
                overflow: 'hidden',
                borderRadius: '8px',
              }}
            >
              <p
                className="card__name"
                style={{
                  fontSize: '32px',
                  lineHeight: '0.9',
                  fontWeight: '700',
                  margin: '0',
                  padding: '20px 10px 0 20px',
                }}
              >
                <span style={{ fontSize: '14px' }}>{player.name}</span>
                <br />
                {player.lastName}
              </p>
              <p
                className="card__num"
                style={{
                  fontSize: '100px',
                  margin: '0 8px 0 0',
                  fontWeight: '700',
                  float: 'right',
                  marginRight: '20px',
                  marginTop: '20px',
                  textShadow: generateLongShadow(player.color),
                }}
              >
                {player.num}
              </p>
            </div>

            {/* Back */}
            <div
              className="card__back"
              style={{
                position: 'absolute',
                backfaceVisibility: 'hidden',
                top: 0,
                left: 0,
                width: '100%',
                height: '340px',
                transform: 'rotateY(180deg) scale(1.1)',
                background: '#333',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              <svg height="180" width="180">
                <circle
                  cx="90"
                  cy="90"
                  r="55"
                  stroke={player.color}
                  strokeWidth="35"
                  fill="transparent"
                />
              </svg>
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '32px',
                  fontWeight: '700',
                  color: 'white',
                }}
              >
                {player.rating}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FlipCard;