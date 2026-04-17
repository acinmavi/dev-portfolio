import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';
import ArchitectureHighlights from './ArchitectureHighlights';

const styles = {
  nameStyle: {
    fontSize: 'clamp(2rem, 8vw, 5em)',
  },
  inlineChild: {
    display: 'inline-block',
  },
  introText: {
    maxWidth: '760px',
    marginTop: '18px',
    marginBottom: '20px',
    fontSize: '1.05rem',
    lineHeight: 1.8,
  },
  focusAreaList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '12px',
    maxWidth: '900px',
    marginBottom: '28px',
  },
  focusAreaPill: {
    padding: '8px 14px',
    borderRadius: '999px',
    fontWeight: 600,
    fontSize: '0.95rem',
  },
  mainContainer: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 16px',
  },
  heroContainer: {
    minHeight: 'calc(100vh - 140px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
};

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <Fade>
      <div style={styles.mainContainer}>
        <div style={styles.heroContainer}>
          <h1 style={styles.nameStyle}>{data?.name}</h1>
          <div style={{ flexDirection: 'row' }}>
            <h2 style={styles.inlineChild}>I&apos;m&nbsp;</h2>
            <Typewriter
              options={{
                loop: true,
                autoStart: true,
                strings: data?.roles,
              }}
            />
          </div>
          {data?.intro && (
            <p style={styles.introText}>{data.intro}</p>
          )}
          {data?.focusAreas?.length > 0 && (
            <div className="home-focus-areas" style={styles.focusAreaList}>
              {data.focusAreas.map((area) => (
                <span key={area} className="home-focus-pill" style={styles.focusAreaPill}>
                  {area}
                </span>
              ))}
            </div>
          )}
          <Social />
        </div>
        <ArchitectureHighlights />
      </div>
    </Fade>
  ) : <FallbackSpinner />;
}

export default Home;
