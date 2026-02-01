import { useRef, useState } from 'react';
import { AboutPlaceContext, useAboutPlace, type AboutPlaceData } from '../aboutContext';
import { useEffect } from 'react';
import { apiService } from '../../services/api.service';
import { WorkingStatus } from '../../const/openState';

interface Props {
  children: React.ReactNode;
}

function AboutPlaceProvider(props: Props) {
  const defaultAboutPlace = useAboutPlace();
  const [aboutPlace, setAboutPlace] = useState<AboutPlaceData>(defaultAboutPlace);
  const firstRender = useRef(true);
  const [workingStatus, setWorkingStatus] = useState<null | WorkingStatus>(null);
  const [dayOfWeek] = useState<number>(new Date().getDay());
  const [warningMessage, setWarningMessage] = useState<string>('');
  // TODO:  add auto reload every hour to update working hours status
  // const [reloadTimeout, setReloadTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!firstRender.current) return;
    firstRender.current = false;
    apiService
      .getAboutInfo()
      .then(data => {
        setAboutPlace({ ...data, isLoaded: true });
      })
      .catch();
  }, []);

  useEffect(() => {
    // console.log(aboutPlace.openningHours.length !== 0);

    const now = new Date();
    if (
      aboutPlace.openningHours.length === 0 ||
      aboutPlace.openningHours[dayOfWeek].opensAt === null ||
      aboutPlace.openningHours[dayOfWeek].closesAt === null
    ) {
      setWorkingStatus(WorkingStatus.NOT_OPENED);
      setWarningMessage('Ми ще не відкрилися');
      return;
    }

    const timeOpenAt = aboutPlace.openningHours[dayOfWeek].opensAt.split(':');
    const timeCloseAt = aboutPlace.openningHours[dayOfWeek].closesAt.split(':');
    const hourOpenAt = parseInt(timeOpenAt[0], 10);
    const minuteOpenAt = parseInt(timeOpenAt[1], 10);
    const hourCloseAt = parseInt(timeCloseAt[0], 10);
    const minuteCloseAt = parseInt(timeCloseAt[1], 10);

    const hourNow = now.getHours();
    const minuteNow = now.getMinutes();

    if (hourNow > hourOpenAt && hourNow < hourCloseAt) {
      setWorkingStatus(null);
    } else if (hourNow === hourOpenAt && minuteNow >= minuteOpenAt) {
      setWorkingStatus(null);
    } else if (hourNow === hourCloseAt && minuteNow <= minuteCloseAt) {
      setWorkingStatus(null);
    } else {
      setWorkingStatus(WorkingStatus.CLOSED);
      let text = 'Ми зараз закриті';
      text += ` Час роботи ${
        hourNow < hourOpenAt
          ? 'сьогодні з ' +
            aboutPlace.openningHours[dayOfWeek].opensAt +
            ' до ' +
            aboutPlace.openningHours[dayOfWeek].closesAt
          : 'завтра з ' +
            aboutPlace.openningHours[dayOfWeek === 6 ? 0 : dayOfWeek + 1].opensAt +
            ' до ' +
            aboutPlace.openningHours[dayOfWeek === 6 ? 0 : dayOfWeek + 1].closesAt
      }`;
      setWarningMessage(text);
    }
  }, [aboutPlace, dayOfWeek]);
  return (
    <AboutPlaceContext value={{ ...aboutPlace, workingStatus, warningMessage }}>
      {props.children}
    </AboutPlaceContext>
  );
}

export default AboutPlaceProvider;
