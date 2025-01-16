import React, { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr";
import Events from "./data";
import { IconCheck } from "@tabler/icons-react";
import { messages } from "./messages";

moment.locale('fr');
const localizer = momentLocalizer(moment);

const MobileCalendar = () => {
  const [calevents, setCalEvents] = React.useState<any>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/calendar`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        
        if (data.status === 'success') {
          const formattedEvents = data.events.map((event: any) => ({
            id: event.id,
            title: event.title,
            start: new Date(event.start),
            end: new Date(event.end),
            allDay: event.allDay,
            color: event.extendedProps?.status === 'upcoming' ? 'green' : 'default',
            extendedProps: event.extendedProps
          }));
          
          setCalEvents(formattedEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const eventColors = (event: any) => {
    if (event.color) {
      return { className: `event-${event.color}` };
    }
    return { className: `event-default` };
  };

  const CustomToolbar = ({ onNavigate, label }: any) => {
    return (
      <div className="custom-toolbar-mobile" style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        marginBottom: "10px",
        padding: "8px" 
      }}>
        <button className="text-sm px-2 py-1 bg-gray-100 rounded" onClick={() => onNavigate("PREV")}>←</button>
        <span className="text-sm font-medium">{label}</span>
        <button className="text-sm px-2 py-1 bg-gray-100 rounded" onClick={() => onNavigate("NEXT")}>→</button>
      </div>
    );
  };

  return (
    <div className="mobile-calendar-wrapper">
      <Calendar
        selectable
        events={calevents}
        defaultView="agenda"
        views={['agenda', 'day']}
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date()}
        localizer={localizer}
        style={{ height: "calc(100vh - 200px)" }}
        eventPropGetter={eventColors}
        messages={messages}
        components={{
          toolbar: CustomToolbar,
        }}
        formats={{
          agendaDateFormat: (date: Date) => moment(date).format('D MMMM'),
          dayFormat: (date: Date) => moment(date).format('dddd D MMMM'),
        }}
      />
    </div>
  );
};

export default MobileCalendar;