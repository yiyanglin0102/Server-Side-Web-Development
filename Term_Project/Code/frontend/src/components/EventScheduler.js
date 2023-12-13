import React, { useState, useEffect, useCallback } from 'react';
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

    const fetchEvents = useCallback(() => {
        axios.get('http://localhost:3001/events')
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

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents, username]);

    const handleSelect = ({ start, end }) => {
        setSelectedEvent({ start, end });
        setIsPromptOpen(true);
    };

    const handleEventSelect = (event) => {
        setSelectedEvent(event);
        setIsPromptOpen(true);
    };

    const handleEventDelete = () => {

        try {
            axios.delete(`http://localhost:3001/events/${selectedEvent._id}`)
                .then(response => {

                    setEvents(events.map(event =>
                        event.id === selectedEvent.id ? { ...response.data, start: moment.tz(response.data.start, TIMEZONE).toDate(), end: moment.tz(response.data.end, TIMEZONE).toDate() } : event
                    ));

                    fetchEvents();
                    setIsPromptOpen(false);
                    setSelectedEvent({ start: null, end: null });
                })
                .catch(error => {
                    console.error("Error deleting event:", error);
                });
            fetchEvents();
            setIsPromptOpen(false);
            setSelectedEvent({ start: null, end: null });

        } catch (error) {
            console.error('Error deleting event:', error);
            return;
        }
    };

    const handleEventSubmit = (formData) => {
        const { title, patient, content } = formData;
        const eventPayload = {
            title,
            patient,
            content,
            username: username,
            allDay: false,
            start: moment(selectedEvent.start).tz(TIMEZONE).toISOString(),
            end: moment(selectedEvent.end).tz(TIMEZONE).toISOString()
        };

        const isNewEvent = !selectedEvent._id;
        const endpoint = isNewEvent ?
            'http://localhost:3001/events' :
            `http://localhost:3001/events/${selectedEvent._id}`;
        const method = isNewEvent ? axios.post : axios.put;

        method(endpoint, eventPayload)
            .then(response => {
                if (isNewEvent) {
                    setEvents([...events, {
                        ...response.data,
                        start: moment.tz(response.data.start, TIMEZONE).toDate(),
                        end: moment.tz(response.data.end, TIMEZONE).toDate()
                    }]);
                } else {
                    setEvents(events.map(event =>
                        event.id === selectedEvent.id ? { ...response.data, start: moment.tz(response.data.start, TIMEZONE).toDate(), end: moment.tz(response.data.end, TIMEZONE).toDate() } : event
                    ));
                }
                fetchEvents();
                setIsPromptOpen(false);
                setSelectedEvent({ start: null, end: null });
            })
            .catch(error => {
                console.error(isNewEvent ? "Error adding event:" : "Error updating event:", error);
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
                onSelectEvent={handleEventSelect}
            />
            <EventPrompt
                isOpen={isPromptOpen}
                onClose={() => setIsPromptOpen(false)}
                onSubmit={handleEventSubmit}
                onDelete={handleEventDelete}
                eventData={selectedEvent} // Pass the selected event data to the prompt
            />
        </div>
    );
};

export default EventScheduler;
