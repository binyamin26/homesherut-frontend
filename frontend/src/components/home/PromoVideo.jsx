import React, { useState, useRef, useEffect } from 'react';

// --- STYLES CSS ---
const styles = `
  /* Conteneur principal */
  .promo-container {
      position: relative;
      width: 100%;
      height: 100%; 
      min-height: 600px;
      
      /* --- MODIFICATION 1 : LE DÉGRADÉ DE FOND (Style Capture d'écran) --- */
      /* Dégradé doux : Violet clair vers Bleu ciel */
      background: linear-gradient(120deg, #E3DFFC 0%, #E3F4FC 100%);
      
      background-size: 200% 200%;
      animation: gradientBG 10s ease infinite; 
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      font-family: 'Heebo', 'Montserrat', sans-serif;
  }

  .promo-container.is-paused * {
      animation-play-state: paused !important;
  }

  @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
  }

  /* --- VIDÉO D'ARRIÈRE-PLAN --- */
  .bg-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 0;
      /* On réduit l'opacité pour bien voir le dégradé derrière */
      opacity: 0.15; 
      mix-blend-mode: multiply; 
  }

  /* --- EFFET BANDE DIAGONALE (Plus visible) --- */
  .video-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      /* Bande blanche brillante qui passe */
      background: linear-gradient(
          110deg, 
          rgba(255,255,255,0) 30%, 
          rgba(255,255,255,0.6) 50%, 
          rgba(255,255,255,0) 70%
      );
      background-size: 200% 100%;
      animation: shimmerOverlay 5s linear infinite; 
      pointer-events: none;
  }

  @keyframes shimmerOverlay {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
  }

  /* --- MARQUEE (DÉFILÉ IMAGES) --- */
  .marquee-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 5;
      background: #0f172a; /* Fond sombre pour contraste images */
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 16px;
      overflow: hidden;
      opacity: 0; 
      transform: rotate(-3deg) scale(1.1);
      pointer-events: none;
  }

  .marquee-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 6;
  }

  .marquee-row {
      display: flex;
      gap: 16px;
      width: max-content;
  }

  .scroll-left { animation: scroll 40s linear infinite; }
  .scroll-right { animation: scrollReverse 40s linear infinite; }

  /* Style des images */
  .marquee-img {
      width: 240px;
      height: 150px;
      border-radius: 8px;
      object-fit: cover;
      opacity: 0.8;
      transition: opacity 0.3s;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  }
  .marquee-img:hover { opacity: 1; }

  @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes scrollReverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }

  /* --- BARRE DE CONTRÔLES --- */
  .controls-container {
      position: absolute;
      bottom: 30px;
      right: 30px;
      z-index: 100;
      display: flex;
      gap: 15px;
      align-items: center;
      direction: ltr;
  }

  .control-btn {
      width: 50px;
      height: 50px;
      background: rgba(255,255,255,0.9);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.5);
      border-radius: 50%;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      color: #004AAD;
      padding: 0;
  }

  .control-btn svg { width: 24px; height: 24px; fill: currentColor; }

  .control-btn:hover {
      transform: translateY(-2px);
      background: #ffffff;
      color: #0078FF;
  }

  .lang-list {
      display: none;
      position: absolute;
      bottom: 120%;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      overflow: hidden;
      list-style: none;
      padding: 5px;
      text-align: center;
      min-width: 120px;
  }
  .control-btn:hover .lang-list { display: block; }
  
  .lang-list li {
      padding: 12px 15px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 700;
      color: #444;
      border-radius: 8px;
  }
  .lang-list li:hover { background-color: #004AAD; color: white; }

  /* --- SCÈNE & TEXTES --- */
  .scene {
      width: 100%;
      height: 100%;
      position: relative;
      perspective: 1000px;
      z-index: 10;
  }

  .text-element {
      color: #004AAD; 
      font-size: clamp(28px, 6vw, 55px);
      font-weight: 900;
      letter-spacing: -0.04em;
      line-height: 1.1;
      width: 85%;
      max-width: 700px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      opacity: 0;
      filter: blur(10px);
      /* Ombre légère pour détacher le texte du fond clair */
      text-shadow: 0 2px 10px rgba(255,255,255,0.5);
  }
  
  .text-white {
      color: #ffffff !important;
      text-shadow: 0 4px 20px rgba(0,0,0,0.8);
  }
  
  .text-element .subtext {
      display: block;
      font-size: 0.55em;
      margin-top: 20px;
      font-weight: 700;
      opacity: 0;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: inherit;
      animation: subtextReveal 27s ease-in-out infinite;
  }

  /* --- ANIMATIONS --- */
  .seq-1 { animation: cinematicReveal 27s ease-in-out infinite; animation-delay: 0s; }
  .seq-2 { animation: cinematicReveal 27s ease-in-out infinite; animation-delay: 3s; }
  .seq-3 { animation: cinematicReveal 27s ease-in-out infinite; animation-delay: 6s; }
  .seq-4 { animation: cinematicReveal 27s ease-in-out infinite; animation-delay: 9s; }
  .seq-5 { animation: cinematicReveal 27s ease-in-out infinite; animation-delay: 12s; }
  .seq-6 { animation: cinematicReveal 27s ease-in-out infinite; animation-delay: 15s; }
  .seq-7 { animation: cinematicReveal 27s ease-in-out infinite; animation-delay: 18s; }
  .seq-8 { animation: cinematicReveal 27s ease-in-out infinite; animation-delay: 21s; }
  .seq-9 { animation: cinematicReveal 27s ease-in-out infinite; animation-delay: 24s; }

  .marquee-anim {
      animation: marqueeFade 27s linear infinite;
      animation-delay: 12s; 
  }
  
  .seq-1 .subtext { animation-delay: 0.3s; }
  .seq-2 .subtext { animation-delay: 3.3s; }
  .seq-3 .subtext { animation-delay: 6.3s; }
  .seq-4 .subtext { animation-delay: 9.3s; }
  .seq-5 .subtext { animation-delay: 12.3s; }
  .seq-6 .subtext { animation-delay: 15.3s; }
  .seq-7 .subtext { animation-delay: 18.3s; }
  .seq-8 .subtext { animation-delay: 21.3s; }
  .seq-9 .subtext { animation-delay: 24.3s; }

  @keyframes cinematicReveal {
      0% { opacity: 0; transform: translate(-50%, -40%) scale(0.85); filter: blur(20px); }
      1.5% { opacity: 1; transform: translate(-50%, -50%) scale(1); filter: blur(0px); }
      9.5% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); filter: blur(0px); }
      11% { opacity: 0; transform: translate(-50%, -60%) scale(1.15); filter: blur(10px); }
      100% { opacity: 0; }
  }

  @keyframes subtextReveal {
      0% { opacity: 0; transform: translateY(20px); }
      2% { opacity: 0.9; transform: translateY(0); }
      9.5% { opacity: 0.9; transform: translateY(0); }
      11% { opacity: 0; transform: translateY(-10px); }
      100% { opacity: 0; }
  }

  @keyframes marqueeFade {
      0% { opacity: 0; z-index: -1; }
      0.5% { opacity: 1; z-index: 5; }
      11% { opacity: 1; z-index: 5; }
      11.5% { opacity: 0; z-index: -1; }
      100% { opacity: 0; z-index: -1; }
  }
`;

// --- DONNÉES DE TRADUCTION ---
const translations = {
  fr: {
      1: "Vous êtes prestataire de services ?<span class='subtext'>Vous cherchez à vous faire connaître ?</span>",
      2: "AllSherut est là pour vous accompagner",
      3: "Inscription simple et rapide",
      4: "Vous sélectionnez les services que vous proposez",
      5: "Plus de 20 catégories de services disponibles<span class='subtext'>Un seul espace pour gérer votre activité</span>",
      6: "Accédez à votre espace personnel",
      7: "Gagnez en visibilité auprès de nouveaux clients",
      8: "Offre de lancement<span class='subtext'>Inscription gratuite actuellement</span>",
      9: "Rejoignez AllSherut<span class='subtext'>allsherut.com</span>"
  },
  he: {
      1: "אתם נותני שירות?<span class='subtext'>רוצים להגדיל את החשיפה שלכם?</span>",
      2: "AllSherut כאן כדי ללוות אתכם",
      3: "הרשמה פשוטה ומהירה",
      4: "בוחרים את השירותים שאתם מציעים",
      5: "יותר מ-20 קטגוריות שירות זמינות<span class='subtext'>מקום אחד לניהול הפעילות שלך</span>",
      6: "גישה מיידית לאזור האישי",
      7: "נחשפים ליותר לקוחות חדשים",
      8: "מבצע השקה<span class='subtext'>הרשמה חינם כרגע</span>",
      9: "הצטרפו ל-AllSherut<span class='subtext'>allsherut.com</span>"
  },
  en: {
      1: "Are you a service provider?<span class='subtext'>Looking to grow your business?</span>",
      2: "AllSherut is here to support you",
      3: "Simple and fast registration",
      4: "Select the services you offer",
      5: "Over 20 service categories available<span class='subtext'>One space to manage your activity</span>",
      6: "Access your personal dashboard",
      7: "Gain visibility with new customers",
      8: "Launch Offer<span class='subtext'>Free registration currently</span>",
      9: "Join AllSherut<span class='subtext'>allsherut.com</span>"
  },
  ru: {
      1: "Вы поставщик услуг?<span class='subtext'>Хотите найти новых клиентов?</span>",
      2: "AllSherut здесь, чтобы помочь вам",
      3: "Простая и быстрая регистрация",
      4: "Выберите услуги, которые вы предлагаете",
      5: "Доступно более 20 категорий услуг<span class='subtext'>Единое пространство для управления вашей деятельностью</span>",
      6: "Доступ к личному кабинету",
      7: "Получите видимость среди клиентов",
      8: "Предложение запуска<span class='subtext'>Регистрация сейчас бесплатна</span>",
      9: "Присоединяйтесь к AllSherut<span class='subtext'>allsherut.com</span>"
  }
};

const PromoVideo = ({ services = [] }) => {
  const [lang, setLang] = useState('he');
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  // --- MODIFICATION 2 : VOS IMAGES ---
  // Remplacez simplement les chemins ci-dessous par les vôtres.
  // Exemple : '/images/mon-plombier.jpg'
  const defaultImages = [
    '/images/plombier.jpg', 
    '/images/electrician.jpg', 
    '/images/peinture.jpg', 
    '/images/cleaning.jpg', 
    '/images/mechanic.jpg', 
    '/images/garden.jpg'
  ];
  
  // Utilise vos images si vous les passez en props, sinon utilise la liste par défaut ci-dessus
  const displayImages = services.length > 0 ? services.map(s => s.image) : defaultImages;
  
  // Duplique la liste pour assurer un défilement infini fluide
  const marqueeList = [...displayImages, ...displayImages, ...displayImages];

  const toggleVideo = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play().catch(e => console.log("Video play failed:", e));
        setIsPaused(false);
      } else {
        video.pause();
        setIsPaused(true);
      }
    }
  };

  const toggleSound = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play().catch(e => console.log("Audio play failed:", e));
        setIsMuted(false);
      } else {
        audio.pause();
        setIsMuted(true);
      }
    }
  };

  // Icônes SVG
  const IconPlay = () => <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>;
  const IconPause = () => <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
  const IconSoundOn = () => <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>;
  const IconSoundOff = () => <svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>;
  const IconLang = () => <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>;

  return (
    <div 
      className={`promo-container ${isPaused ? 'is-paused' : ''}`} 
      dir={lang === 'he' ? 'rtl' : 'ltr'}
    >
      <style>{styles}</style>
      
      {/* VIDÉO D'ARRIÈRE-PLAN */}
      <video ref={videoRef} className="bg-video" autoPlay loop muted playsInline>
          <source src="/background.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay"></div>

      {/* AUDIO */}
      <audio ref={audioRef} loop src="/musique.mp3"></audio>

      {/* MARQUEE */}
      <div className="marquee-wrapper marquee-anim">
          <div className="marquee-row scroll-left">
              {marqueeList.map((src, i) => (
                  <img 
                    key={`l1-${i}`} 
                    src={src} 
                    className="marquee-img" 
                    alt="" 
                    onError={(e) => e.target.style.display = 'none'} 
                  />
              ))}
          </div>
          <div className="marquee-row scroll-right">
              {marqueeList.map((src, i) => (
                  <img 
                    key={`l2-${i}`} 
                    src={src} 
                    className="marquee-img" 
                    alt="" 
                    onError={(e) => e.target.style.display = 'none'} 
                  />
              ))}
          </div>
          <div className="marquee-overlay"></div>
      </div>

      {/* CONTRÔLES */}
      <div className="controls-container">
          <button className="control-btn" onClick={toggleVideo} title="Lecture/Pause">
              {isPaused ? <IconPlay /> : <IconPause />}
          </button>
          
          <button className="control-btn" onClick={toggleSound} title="Son">
              {isMuted || (audioRef.current && audioRef.current.paused) ? <IconSoundOff /> : <IconSoundOn />}
          </button>
          
          <div className="control-btn" title="Langue">
              <IconLang />
              <ul className="lang-list">
                  <li onClick={() => setLang('he')}>עברית</li>
                  <li onClick={() => setLang('fr')}>Français</li>
                  <li onClick={() => setLang('en')}>English</li>
                  <li onClick={() => setLang('ru')}>Русский</li>
              </ul>
          </div>
      </div>

      {/* SCÈNE & TEXTES */}
      <div className="scene">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
          <div 
            key={id}
            className={`text-element seq-${id} ${id === 5 ? 'text-white' : ''}`}
            dangerouslySetInnerHTML={{ __html: translations[lang][id] }}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoVideo;