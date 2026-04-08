import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  aboutLayout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '2rem',
    width: '100%',
    maxWidth: '960px',
    padding: '0 20px',
    flexWrap: 'wrap',
  },
  introTextContainer: {
    flex: '1 1 300px',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    flex: '1 1 300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        {data
          ? (
            <Fade>
              <div style={styles.aboutLayout}>
                <div style={styles.introTextContainer}>
                  {parseIntro(data.about)}
                </div>
                <div style={styles.introImageContainer}>
                  <img src={data?.imageSource} alt="profile" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
                </div>
              </div>
            </Fade>
          )
          : <FallbackSpinner />}
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
