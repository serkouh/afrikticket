import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr";
import Events from "./data";
import { IconCheck } from "@tabler/icons-react";
import { messages } from "./messages";

moment.locale('fr');
const localizer = momentLocalizer(moment);

const MobileCalendar = () => {
  const [calevents] = React.useState<any>(Events);

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