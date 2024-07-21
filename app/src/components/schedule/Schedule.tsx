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

import Modal from '../modal/Modal'

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
   const [events, setEvents] = useState<Event[]>([]) // lista de eventos
   const [showModal, setShowModal] = useState<boolean>(false) // mostra o modal
   const [selectedDate, setSelectedDate] = useState<Date | null>(null) // data selecionada
   const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null) // resourceId selecionado
   const [eventTitle, setEventTitle] = useState<string>('') // titulo do evento
   const [service, setService] = useState<string>('')

   const ecRef = useRef<any>(null) // referencia para a agenda

   const resources = Array.from({ length: 3 }, (_, i) => ({ id: String(i + 1), title: 'gab' }))

   // clique na agenda
   const handleDateClick = (info: DateClickInfo) => {
      const clickedDate = new Date(info.date)
      const resourceId = info.resource.id

      setSelectedDate(clickedDate)
      setSelectedResourceId(resourceId)
      setShowModal(true)
   }

   // salvar eventos e adicionar a agenda
   const saveEvent = (e: React.FormEvent) => {
      e.preventDefault()

      if (eventTitle && selectedDate && selectedResourceId) {
         const newEvent: Event = {
            id: uuidv4(),
            title: `${eventTitle} - ${service}`,
            start: selectedDate,
            end: new Date(selectedDate.getTime() + 60 * 60 * 1000),
            backgroundColor: `${(props: { theme: { colors: { primary: string } } }) => props.theme.colors.primary}`,
            resourceId: selectedResourceId,
         }

         setEvents((prevEvents) => [...prevEvents, newEvent])
         
         setEventTitle('')
         setService('')
         setSelectedDate(null)
         setSelectedResourceId(null)

         console.log(newEvent.id)
      }
   }

   const handleEventClick = () => {
      console.log('event click')
   }

   // fecha o modal
   const handleCloseModal = () => {
      setShowModal(false)
      setSelectedDate(null)
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
               eventClick: handleEventClick,
            },
         },
      })
   }

   return (
      <StyledWrapper>
         <StyledCalendarWrapper id="ec" className="allAgenda">
            {showModal && (
               <Modal isOpen onClose={handleCloseModal} title="Agendamento">
                  <div>
                     <input
                        type="text"
                        id="eventTitle"
                        placeholder="nome"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                     />
                     <input
                        type="text"
                        id="service"
                        placeholder="serviço"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                     />

                     <button type="submit" onClick={saveEvent}>
                        salvar
                     </button>
                  </div>
               </Modal>
            )}
         </StyledCalendarWrapper>
      </StyledWrapper>
   )
}
