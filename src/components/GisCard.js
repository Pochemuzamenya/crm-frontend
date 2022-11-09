import { Container, Typography } from '@mui/material'
import React from 'react'

function GisCard({data}) {
  return (
      <Container>
          <Typography>
              {data.address_name}
          </Typography>
          <Typography>
              {data.name}
          </Typography>
          {/* <ul>
              {data.point.map((point) => {
                  return (
                      <li>{point}</li>
                  )
              })}
          </ul> */}
    </Container>
  )
}

export default GisCard