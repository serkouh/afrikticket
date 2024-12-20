const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();

export interface EventType {
  title?: string;
  allDay?: boolean;
  start?: Date;
  end?: Date;
  color?: string;
}

const Events: EventType[] = [
  {
    title: 'Événement de collecte de fonds',
    allDay: true,
    start: new Date(y, m, 3),
    end: new Date(y, m, 5),
    color: 'default',
  },
  {
    title: 'Événement de collecte de fonds',
    start: new Date(y, m, d + 3, 10, 30),
    end: new Date(y, m, d + 3, 11, 30),
    allDay: false,
    color: 'green',
  },
  {
    title: 'Événement de collecte de fonds',
    start: new Date(y, m, d + 7, 12, 0),
    end: new Date(y, m, d + 7, 14, 0),
    allDay: false,
    color: 'red',
  },
  {
    title: 'Événement de collecte de fonds',
    start: new Date(y, m, d - 2),
    end: new Date(y, m, d - 2),
    allDay: true,
    color: 'azure',
  },
  {
    title: 'Événement de collecte de fonds',
    start: new Date(y, m, d + 1, 19, 0),
    end: new Date(y, m, d + 1, 22, 30),
    allDay: false,
    color: 'azure',
  },
  {
    title: 'Événement de collecte de fonds',
    start: new Date(y, m, 23),
    end: new Date(y, m, 25),
    color: 'warning',
  },
  {
    title: 'Événement de collecte de fonds',
    start: new Date(y, m, 19),
    end: new Date(y, m, 22),
    color: 'default',
  },
];

export default Events;
