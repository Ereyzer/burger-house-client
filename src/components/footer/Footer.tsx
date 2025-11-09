import { useAboutPlace } from '../../context/aboutContext';
import './footer.css';
function Footer() {
  const aboutPlace = useAboutPlace();
  const phone = aboutPlace.phone?.split('') || [];

  return (
    <footer className="footer montserrat-font montserrat-medium montserrat-medium-600">
      <div className="container">
        <hr />
        <section className="footer__contacts" aria-labelledby="contacts-title">
          <h2 id="contacts-title" className="visually-hidden">
            Контактна інформація
          </h2>
          <ul className="footer__contact-list">
            <li>
              <a
                href={`tel:+380${aboutPlace.phone || ''}`}
                aria-label="Зателефонувати за номером +38 (050) 123-45-67"
              >
                {'📞 ' +
                  `+38 (0${phone.slice(0, 2).join('')}) ${phone.slice(2, 5).join('')}-${phone
                    .slice(5, 7)
                    .join('')}-${phone.slice(7, 9).join('')}`}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${aboutPlace.email}`}
                aria-label="Надіслати лист на електронну адресу info@example.com"
              >
                {`✉️ ${aboutPlace.email || ''}`}
              </a>
            </li>
          </ul>
        </section>

        <address className="footer__address" aria-label="Адреса закладу">
          <p>
            <a
              href={aboutPlace.placeLink || 'https://maps.app.goo.gl/6No5EMZEWjjGCyCB6'}
              aria-label="Відкрити в Гугл картах"
              target="_blank"
            >
              {aboutPlace.placeAddress || ''}
            </a>
          </p>
        </address>

        <section className="footer__social" aria-labelledby="social-title">
          <h2 id="social-title" className="visually-hidden">
            Ми в соціальних мережах
          </h2>
          <ul className="footer__social-list" aria-label="Список посилань на соціальні мережі">
            <li>
              <a
                href={aboutPlace.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Відкрити сторінку у Фейсбуці"
              >
                🌐 Facebook
              </a>
            </li>
            <li>
              <a
                href={aboutPlace.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Відкрити сторінку в Інстаграмі"
              >
                📷 Instagram
              </a>
            </li>
          </ul>
        </section>

        <p className="footer__credits">
          <small>
            Розроблено{' '}
            <a href="https://ivanlavercv.netlify.app/" rel="noopener noreferrer">
              Ivan Laver
            </a>
          </small>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
