import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import GisFetchDataGrid from '../components/GisFetchDataGrid'
import GisList from '../components/GisList'
import { useLazyFetchCityByNameQuery, useLazyFetchPlaceByCityQuery } from '../redux/api/gisApi'

function GisDataPage() {

    const [city, setCity] = useState('')
    const [place, setPlace] = useState('')

    const [byNameQuery, cityNameRes, lastPromiseInfo] = useLazyFetchCityByNameQuery()

    const [byCityQuery, placeRes] = useLazyFetchPlaceByCityQuery()

    const handleClick = async (city) => {
        if (city) {
            try {
                await byNameQuery(city)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        cityNameRes.isSuccess ?
            byCityQuery({ place, city_id: cityNameRes.data.result.items[0].id })
            : console.log(cityNameRes.isSuccess)
    }, [cityNameRes.isSuccess])

    return (
        <Box>
            <Grid container spacing={2} sx={{
                paddingTop: '20px',
            }} >
                <Grid container xs={8} >
                    <Container sx={{
                        '& .MuiTextField-root': { m: 4, width: '25ch' }
                    }}>
                        <TextField label='Город' onChange={(e) => setCity(e.target.value)} value={city} />
                        <TextField label='Название учреждения' onChange={(e) => setPlace(e.target.value)} value={place} />
                    </Container>
                </Grid>
                <Grid container xs={4} sx={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }} >
                    
                </Grid>
                <Grid container xs={6} sx={{
                    '.MuiButtonBase-root': { m: 4, width: '25ch' },
                    alignItems: 'center',
                    justifyContent: 'center'
                }} >
                    <Container  >
                        <Button
                            variant='contained'
                            onClick={() => handleClick(city)}
                        >
                            Найти
                        </Button>
                    </Container>
                </Grid>
                <Grid container xs={12}>
                    <Container>
                        <Typography variant='h3' textAlign='center' margin={2} >
                            {placeRes.isSuccess ? `Город: ${cityNameRes.data.result.items[0].full_name}` : <></>}
                        </Typography>
                        {placeRes.isSuccess ? <GisFetchDataGrid data={placeRes} /> : <Box />}
                    </Container>
                </Grid>
            </Grid>

        </Box>
    )
}

export default GisDataPage