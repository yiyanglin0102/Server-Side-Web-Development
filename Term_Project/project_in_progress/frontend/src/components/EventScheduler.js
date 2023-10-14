import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventPrompt from './EventPrompt';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment-timezone';
const localizer = momentLocalizer(moment);
const TIMEZONE = "America/New_York";
moment.tz.setDefault(TIMEZONE);

const EventScheduler = (props) => {
    const [events, setEvents] = useState([]);
    const [isPromptOpen, setIsPromptOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({ start: null, end: null });
    const username = props.username || "null";

    useEffect(() => {
        axios.get('http://localhost:3000/events')
            .then(response => {
                const updatedEvents = response.data
                    .filter(event => event.username === username)
                    .map(event => ({
                        ...event,
                        start: moment.tz(event.start, TIMEZONE).toDate(),
                        end: moment.tz(event.end, TIMEZONE).toDate()
                    }));
                setEvents(updatedEvents);
            })
            .catch(error => {
                console.error("Error fetching events:", error);
            });
    }, [username]);

    const handleSelect = ({ start, end }) => {
        setSelectedEvent({ start, end });
        setIsPromptOpen(true);
    };

    const handleEventSubmit = (formData) => {
        const { title, patient, content } = formData;
        console.log(`User ${username} is adding a new event.`);

        axios.post('http://localhost:3000/events', {
            title,
            patient,
            content,
            username: username,
            allDay: false,
            start: moment(selectedEvent.start).tz(TIMEZONE).toISOString(),
            end: moment(selectedEvent.end).tz(TIMEZONE).toISOString()
        })
            .then(response => {
                setEvents([...events, {
                    ...response.data,
                    start: moment.tz(response.data.start, TIMEZONE).toDate(),
                    end: moment.tz(response.data.end, TIMEZONE).toDate()
                }]);
                setIsPromptOpen(false);
            })
            .catch(error => {
                console.error("Error adding event:", error);
            });
    };

    return (
        <div style={{ height: '500px' }}>
            <Calendar
                selectable
                localizer={localizer}
                events={events}
                defaultView="week"
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                onSelectSlot={handleSelect}
            />
            <EventPrompt
                isOpen={isPromptOpen}
                onClose={() => setIsPromptOpen(false)}
                onSubmit={handleEventSubmit}
            />
        </div>
    );
};

export default EventScheduler;
