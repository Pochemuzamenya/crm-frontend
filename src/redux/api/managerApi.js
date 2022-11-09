import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const url = 'http://localhost:8080/'

export const managerApi = createApi({
    reducerPath: 'manager',
    baseQuery: fetchBaseQuery({
        baseUrl: url,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState()).user.currentUser.token

            if (token) headers.set('authorization', `Bearer ${token}`)
            
            return headers
        },
    }),
    endpoints: (build) => ({
        getManager: build.query({
            query: (id) => `manager/${id}`,
            
        })
    })
})

export const { useGetManagerQuery, useLazyGetManagerQuery } = managerApi
