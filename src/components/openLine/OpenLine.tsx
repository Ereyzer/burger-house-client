import { useAboutPlace } from '../../context/aboutContext';
import WarningLine from '../../pages/orderPlace/warningLine';

function OpenLine() {
  const aboutPlace = useAboutPlace();
  const { warningMessage, workingStatus } = aboutPlace;
  return <>{!workingStatus || <WarningLine message={warningMessage} />}</>;
}

export default OpenLine;
