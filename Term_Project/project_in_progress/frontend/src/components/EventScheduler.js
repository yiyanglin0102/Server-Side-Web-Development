import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment-timezone';  // Import moment-timezone here
const localizer = momentLocalizer(moment); // Use moment with momentLocalizer here
const TIMEZONE = "America/New_York"; // or any other valid time zone string
moment.tz.setDefault(TIMEZONE);

const EventScheduler = (props) => {
    const [events, setEvents] = useState([]);
    const username = props.username || "null"; // handle potential undefined username

    useEffect(() => {
        axios.get('http://localhost:3000/events')
            .then(response => {
                const updatedEvents = response.data
                    .filter(event => event.username === username)  // Filter events based on username
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
    }, [username]);  // Add username as a dependency to refetch events if it changes
    
    
    const handleSelect = ({ start, end }) => {
        const title = window.prompt("Enter event title:");

        if (title) {
            // Retrieve the username from local storage
            console.log(`User ${username} is adding a new event.`); // Log the username here
    
            axios.post('http://localhost:3000/events', {
                title,
                username: username,
                allDay: false,
                start: moment(start).tz(TIMEZONE).toISOString(),
                end: moment(end).tz(TIMEZONE).toISOString()
            })
            .then(response => {
                setEvents([...events, {
                    ...response.data,
                    start: moment.tz(response.data.start, TIMEZONE).toDate(),
                    end: moment.tz(response.data.end, TIMEZONE).toDate()
                }]);
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
