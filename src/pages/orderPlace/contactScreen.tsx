import css from './orderPalce.module.css';
import clsx from 'clsx';

interface Props {
  name: string;
  phone: string;
  setName: (value: string) => void;
  setPhone: (value: string) => void;
}

function ContactScreen({ name, phone, setName, setPhone }: Props) {
  const phoneChecker = (text: string) => {
    if (isNaN(+text)) return;
    if (text.length > 9) {
      const last = text.slice(text.length - 9, text.length);
      setPhone(last);
      return;
    }
    setPhone(text);
  };
  return (
    <>
      <div className={css.contactScreen}>
        <form className={clsx(css.addressForm, css.contactForm)}>
          <label htmlFor="name">
            Ім'я{' '}
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ім'я"
            />
          </label>
          <label htmlFor="phone">
            +380{' '}
            <input
              id="phone"
              name="phone"
              type="text"
              value={phone}
              onChange={e => phoneChecker(e.target.value)}
              placeholder="943837169"
            />
          </label>
          {/* <input id="email" /> */}
        </form>
      </div>
    </>
  );
}

export default ContactScreen;
