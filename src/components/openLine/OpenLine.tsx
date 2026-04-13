import { useAboutPlace } from '../../context/aboutContext';
import WarningLine from '../../pages/orderPlace/warningLine';

function OpenLine() {
  const aboutPlace = useAboutPlace();
  const { warningMessage } = aboutPlace;
  console.log('aboutPlace:', aboutPlace);
  return <>{warningMessage !== '' && <WarningLine message={warningMessage} />}</>;
}

export default OpenLine;
