import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const url = 'http://localhost:8080/'

export const login = createApi({
    reducerPath: 'login',
    baseQuery: fetchBaseQuery({
        baseUrl: url,
        prepareHeaders: (headers) => {
            headers.set('Content-type', 'application/x-www-form-urlencoded')
            return headers
        }
    }),
    endpoints: (build) => ({
        login: build.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            })
        })
    })
})

export const {useLoginMutation} = login