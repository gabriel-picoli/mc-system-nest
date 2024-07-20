/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useRef, useState } from 'react'

import Calendar from '@event-calendar/core'
import TimeGrid from '@event-calendar/time-grid'
import Interaction from '@event-calendar/interaction'
import List from '@event-calendar/list'
import Resource from '@event-calendar/resource-time-grid'
import '@event-calendar/core/index.css'

import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

const StyledWrapper = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   margin: 20px;
`

const StyledCalendarWrapper = styled.div`
   flex: 1;
   overflow: hidden;
   border-radius: 11px;
   box-shadow: 0 0 10px rgba(0, 0, 0);
   width: 1300px;

   .ec {
      padding: 10px;
   }

   .ec-body {
      border: none;
   }
   .ec-content {
      background-color: transparent;
      border: 1px solid ${(props) => props.theme.colors.primary};
      border-radius: 15px;
   }
   .ec-resource {
      border-left: 1.5px solid ${(props) => props.theme.colors.primary};
   }
   .ec-day {
      background-color: transparent;
      border: none;
   }
   .ec-time {
      border: none;
   }
   .ec-sidebar {
      margin-left: -15px;
   }
   .ec-line {
      display: none;
   }
   .ec-header {
      display: none;
      border: none;
   }
   .ec-event {
      background-color: ${(props) => props.theme.colors.primary};
   }
`

interface DateClickInfo {
   date: Date
   resource: {
      id: string
      title: string
   }
}

interface Event {
   id: string
   title: string
   start: Date
   end: Date
   backgroundColor: string
   resourceId: string
}

export default function Schedule() {
   const [events, setEvents] = useState<Event[]>([])

   const ecRef = useRef<any>(null) // referencia para a agenda

   const resources = Array.from({ length: 3 }, (_, i) => ({ id: String(i + 1), title: 'gab' }))

   const handleDateClick = (info: DateClickInfo) => {
      const start = new Date(info.date)
      const end = new Date(start.getTime() + 60 * 60 * 1000) // Adiciona 1 hora de duração
      const resourceId = info.resource.id

      const newEvent: Event = {
         id: uuidv4(),
         title: 'evento teste',
         start,
         end,
         backgroundColor: `${(props: { theme: { colors: { primary: string } } }) => props.theme.colors.primary}`,
         resourceId,
      }

      setEvents((prevEvents) => [...prevEvents, newEvent])

      console.log(newEvent)
   }

   // atualiza a agenda quando a lista de eventos muda
   useEffect(() => {
      if (ecRef.current) {
         ecRef.current.setOption('events', events)
      }
   }, [events])

   // inicializa a agenda
   useEffect(() => {
      if (!ecRef.current) {
         initializeSchedule()
      }
   }, [])

   const initializeSchedule = () => {
      ecRef.current = new Calendar({
         target: document.getElementById('ec'),
         props: {
            plugins: [TimeGrid, Interaction, List, Resource],
            options: {
               view: 'resourceTimeGridDay',
               allDaySlot: false,
               slotMinTime: '06:00:00',
               slotMaxTime: '21:30:00',
               headerToolbar: {
                  start: 'prev,next today',
                  center: 'title',
                  end: '',
               },
               buttonText: {
                  today: 'Hoje',
               },
               pointer: true,
               events,
               resources,
               dateClick: handleDateClick,
            },
         },
      })
   }

   return (
      <StyledWrapper>
         <StyledCalendarWrapper id="ec" className="allAgenda" />
      </StyledWrapper>
   )
}
