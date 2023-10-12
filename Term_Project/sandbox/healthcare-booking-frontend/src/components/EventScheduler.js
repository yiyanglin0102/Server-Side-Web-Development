import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'; // Import moment here
const localizer = momentLocalizer(moment); // Use moment with momentLocalizer here

const EventScheduler = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error("Error fetching events:", error);
            });
    }, []);

    const handleSelect = ({ start, end }) => {
        const title = window.prompt("Enter event title:");
        if (title) {
            axios.post('http://localhost:3001/events', { title, start, end })
                .then(response => {
                    setEvents([...events, response.data]);
                })
                .catch(error => {
                    console.error("Error adding event:", error);
                });
        }
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
        </div>
    );
};

export default EventScheduler;
