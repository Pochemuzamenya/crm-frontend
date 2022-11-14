import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const url = 'http://localhost:8080/'

export const clientsApi = createApi({
    reducerPath: 'clientsApi',
    tagTypes: ['Client'],
    baseQuery: fetchBaseQuery({
        baseUrl: url,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState()).user.currentUser.token
            if (token) headers.set('authorization', `Bearer ${token}`)

            return headers
        },
    }),
    endpoints: (build) => ({
        getClients: build.query({
            query: () => `api/client`,
            providesTags: (result) => result
                ? [
                    ...result.map(({ id }) => ({ type: 'Client', id })),
                    { type: 'Client', id: 'LIST' },
                ] : [{type: 'Client', id: 'LIST'}],
                }),
        addClient: build.mutation({
            query: (body) => ({
                url: `api/client`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{type: 'Client', id: 'LIST'}]
        }),
        updateClient: build.mutation({
            query: (body) => ({
                url: `api/client`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: [{type: 'Client', id: 'LIST'}]
        }),
        deleteClient: build.mutation({
            query: (id) => ({
                url: `api/client/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Client', id: 'LIST'}]
        })
    })
})

export const { useGetClientsQuery, useAddClientMutation, useUpdateClientMutation, useDeleteClientMutation } = clientsApi