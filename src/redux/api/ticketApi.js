import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const url = 'http://localhost:8080/'

export const ticketApi = createApi({
    reducerPath: 'ticketApi',
    tagTypes: ['Ticket'],
    baseQuery: fetchBaseQuery({
        baseUrl: url,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState()).user.currentUser.token
            if (token) headers.set('authorization', `Bearer ${token}`)

            return headers
        },
    }),
    endpoints: (build) => ({
        getTicketByClient: build.query({
            query: (id) => `ticket/${id}`,
            providesTags: (result, id) => result
                ? [
                    ...result.map(({ id }) => ({ type: 'Ticket', id })),
                    { type: 'Ticket', id: 'LIST' },
                ] : [{ type: 'Ticket', id: 'LIST' }],
        }),
        addTicket: build.mutation({
            query: (body) => ({
                url: `api/ticket`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Ticket', id: 'LIST' }]
        }),
        updateTicket: build.mutation({
            query: (body) => ({
                url: `api/ticket`,
                method: 'PUT',
                body,
            })
        }),
        deleteTicket: build.mutation({
            query: (id) => ({
                url: `api/ticket/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Ticket', id: 'LIST' }]
        })
    })
})

export const { useGetTicketsQuery, useAddTicketMutation, useUpdateTicketMutation, useDeleteTicketMutation, useGetTicketByClientQuery } = ticketApi