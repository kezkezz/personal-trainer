import { EventCalendar } from '@mui/x-scheduler/event-calendar';
import type { SchedulerEvent } from '@mui/x-scheduler/models';
import dayjs from "dayjs";
import * as React from 'react';
import { useEffect } from 'react';
import { getTrainings } from '../api/trainingsapi';
import type { TrainingData } from '../types';


/*

    Testi

    const initialEvents: SchedulerEvent[] = [
        {
            id: 1,
            title: "Juoksu - Masa",
            start: "2026-11-18T10:00:00",
            end: dayjs("2026-11-18T10:00:00").add(60, "minute").toISOString()
        }
    ];
*/



export default function RenderEventCalendar() {
    const [events, setEvents] = React.useState<SchedulerEvent[]>([]);

    useEffect(() => {
        getTrainings()
            .then((data: TrainingData[]) => {
                const calendarEvents: SchedulerEvent[] = data.map(training => ({
                    id: training.id,
                    title: training.activity + " - " + training.customer.firstname + " " + training.customer.lastname,
                    start: training.date,
                    end: dayjs(training.date).add(training.duration, "minute").toISOString()
                }));

                setEvents(calendarEvents);
            })
            .catch(error => console.error(error));
    }, []);


    return (
    <div style={{ height: 600, width: '100%' }}>
      <EventCalendar
        color='info'
        events={events}
        onEventsChange={setEvents}
        defaultVisibleDate={new Date(2026, 10, 18)}
      />
    </div>
  );
}
 