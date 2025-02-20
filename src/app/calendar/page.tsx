"use client";

import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import "moment/locale/fr"; // Add this import for French locale
import { useMediaQuery } from "@mui/material";

import Events from "./data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import MobileCalendar from "./MobileCalendar";

// import PageContainer from "@/app/components/container/PageContainer";
// import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import { IconCheck, IconMapPin, IconBuilding, IconCoin, IconTicket, IconFileDescription, IconCalendarEvent } from "@tabler/icons-react";
// import BlankCard from "@/app/components/shared/BlankCard";

moment.locale('fr');
console.log(moment.locale()); // Should log 'fr'

// Initialize localizer after setting the locale
const localizer = momentLocalizer(moment);

// Add French messages configuration
const messages = {
  allDay: 'Toute la journée',
  previous: 'Précédent',
  next: 'Suivant',
  today: "Aujourd'hui",
  month: 'Mois',
  week: 'Semaine',
  day: 'Jour',
  agenda: 'Agenda',
  date: 'Date',
  time: 'Heure',
  event: 'Événement',
  noEventsInRange: 'Aucun événement dans cette plage.',
  showMore: (total: number) => `+ ${total} événement(s) supplémentaire(s)`
};

type EvType = {
  title: string;
  allDay?: boolean;
  start?: Date;
  end?: Date;
  color?: string;
};

// First, define the EventComponent outside of the BigCalendar component
const EventComponent = ({ event }: any) => {
  return (
    <div className="event-tooltip">
      <strong>{event.title}</strong>
    </div>
  );
};

const BigCalendar = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [selectedEvent, setSelectedEvent] = React.useState<any>(null);
  const [showEventDetails, setShowEventDetails] = React.useState(false);

  const [calevents, setCalEvents] = React.useState<any>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [slot, setSlot] = React.useState<EvType>();
  const [start, setStart] = React.useState<any | null>();
  const [end, setEnd] = React.useState<any | null>();
  const [color, setColor] = React.useState<string>("default");
  const [update, setUpdate] = React.useState<EvType | undefined | any>();

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleCloseEventDetails = () => {
    setShowEventDetails(false);
    setSelectedEvent(null);
  };

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
            color: event.extendedProps?.status === 'upcoming' ? 'green' : 'red',
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

  const ColorVariation = [
    {
      id: 1,
      eColor: "#1a97f5",
      value: "default",
    },
    {
      id: 2,
      eColor: "#39b69a",
      value: "green",
    },
    {
      id: 3,
      eColor: "#fc4b6c",
      value: "red",
    },
    {
      id: 4,
      eColor: "#615dff",
      value: "azure",
    },
    {
      id: 5,
      eColor: "#fdd43f",
      value: "warning",
    },
  ];
  const addNewEventAlert = (slotInfo: EvType) => {
    setOpen(true);
    setSlot(slotInfo);
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
  };

  const editEvent = (event: any) => {
    setOpen(true);
    const newEditEvent = calevents.find(
      (elem: EvType) => elem.title === event.title
    );
    setColor(event.color);
    setTitle(newEditEvent.title);
    setColor(newEditEvent.color);
    setStart(newEditEvent.start);
    setEnd(newEditEvent.end);
    setUpdate(event);
  };

  const updateEvent = (e: any) => {
    e.preventDefault();
    setCalEvents(
      calevents.map((elem: EvType) => {
        if (elem.title === update.title) {
          return { ...elem, title, start, end, color };
        }

        return elem;
      })
    );
    setOpen(false);
    setTitle("");
    setColor("");
    setStart("");
    setEnd("");
    setUpdate(null);
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const selectinputChangeHandler = (id: string) => setColor(id);

  const submitHandler = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const newEvents = calevents;
    newEvents.push({
      title,
      start,
      end,
      color,
    });
    setOpen(false);
    e.target.reset();
    setCalEvents(newEvents);
    setTitle("");
    setStart(new Date());
    setEnd(new Date());
  };
  const deleteHandler = (event: EvType) => {
    const updatecalEvents = calevents.filter(
      (ind: EvType) => ind.title !== event.title
    );
    setCalEvents(updatecalEvents);
  };

  const handleClose = () => {
    // eslint-disable-line newline-before-return
    setOpen(false);
    setTitle("");
    setStart(new Date());
    setEnd(new Date());
    setUpdate(null);
  };

  const eventColors = (event: any) => {
    const colorClass = event.color ? `event-${event.color}` : 'event-default';
    return {
      className: colorClass,
      style: {
        cursor: 'pointer'
      }
    };
  };

  const handleStartChange = (newValue: any) => {
    setStart(newValue);
  };
  const handleEndChange = (newValue: any) => {
    setEnd(newValue);
  };

  const CustomToolbar = ({ onNavigate, label }: any) => {
    return (
      <div className="custom-toolbar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <button onClick={() => onNavigate("PREV")}>Précédent</button>
        <span style={{ fontWeight: "bold", fontSize: "16px" }}>{label}</span>
        <button onClick={() => onNavigate("NEXT")}>Suivant</button>
      </div>
    );
  };

  // Create the French localizer
  // const localizer = momentLocalizer(moment.locale("fr"));

  return (
    <div className={`nc-PageAddListing1 mx-auto max-w-7xl px-4 pb-24 pt-14 sm:py-24 lg:pb-32`}>
      <h2 className="text-3xl font-semibold lg:text-4xl mb-10 text-center">
        Calendrier des événements
      </h2>
      <div className="listingSection__wrap">
        {isMobile ? (
          <MobileCalendar />
        ) : (
          <CardContent>
            <Calendar
              selectable
              events={calevents}
              defaultView="month"
              scrollToTime={new Date(1970, 1, 1, 6)}
              defaultDate={new Date()}
              localizer={localizer}
              style={{ height: "calc(100vh - 350px)" }}
              eventPropGetter={eventColors}
              messages={messages}
              components={{
                toolbar: CustomToolbar,
                event: EventComponent
              }}
              onSelectEvent={handleEventClick}
            />
          </CardContent>
        )}

        {/* Event Details Dialog */}
        <Dialog 
          open={showEventDetails} 
          onClose={handleCloseEventDetails}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent className="!p-6">
            {selectedEvent && (
              <div className="flex flex-col space-y-6">
                {selectedEvent.extendedProps?.image && (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden">
                    <img 
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${selectedEvent.extendedProps.image}`}
                      alt={selectedEvent.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex justify-between items-start">
                  <Typography variant="h5" component="h2" className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    {selectedEvent.title}
                  </Typography>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                    selectedEvent.extendedProps?.status === 'upcoming' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {selectedEvent.extendedProps?.status || 'upcoming'}
                  </span>
                </div>

                <div className="grid gap-4 text-neutral-600 dark:text-neutral-300">
                  <div className="flex items-center gap-3">
                    <IconMapPin size={20} className="text-neutral-500" stroke={1.5} /> 
                    <span>{selectedEvent.extendedProps?.location || 'No location'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <IconBuilding size={20} className="text-neutral-500" stroke={1.5} />
                    <span>{selectedEvent.extendedProps?.organization || 'No organization'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <IconCalendarEvent size={20} className="text-neutral-500" stroke={1.5} />
                    <span>{new Date(selectedEvent.start).toLocaleString('fr-FR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <IconTicket size={20} className="text-neutral-500" stroke={1.5} />
                    <span>{selectedEvent.extendedProps?.ticketCount || 0} tickets</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <IconCoin size={20} className="text-neutral-500" stroke={1.5} />
                    <span>{selectedEvent.extendedProps?.totalCost || 0} FG</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <IconFileDescription size={20} className="text-neutral-500 mt-1" stroke={1.5} />
                    <p className="text-sm leading-relaxed">{selectedEvent.extendedProps?.description || 'No description'}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
          <DialogActions className="!p-6 !pt-0">
            <Button 
              onClick={handleCloseEventDetails}
              className="bg-primary-6000 hover:bg-primary-700 text-white px-6 py-2 rounded-full"
            >
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default BigCalendar;
