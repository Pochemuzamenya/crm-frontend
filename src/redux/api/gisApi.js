import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const url = 'https://catalog.api.2gis.com/3.0/'
const key = 'apikey'

export const gisApi = createApi({
    reducerPath: 'gisApi',
    tagTypes: ['GisData'],
    baseQuery: fetchBaseQuery({
        baseUrl: url,
    }),
    endpoints: (build) => ({
        fetchCityByName: build.query({
            query: (city) => `items?q=${city}&key=${key}`,
        }),
        fetchPlaceByCity: build.query({
            query: ({place, city_id}) => `items?q=${place}&fields=items.point&city_id=${city_id}&key=${key}`,
        })
    })

})

export const { useFetchCityByNameQuery,
    useFetchPlaceByCityQuery,
    useLazyFetchCityByNameQuery,
    useLazyFetchPlaceByCityQuery } = gisApi
