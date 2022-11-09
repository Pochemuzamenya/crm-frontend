import { Container } from '@mui/material'
import React from 'react'
import GisCard from './GisCard'

function GisList({data}) {
  return (
      <Container>
          <ul>
              {data.result.items.map((item) => {
                  return (
                      <li key={item.id}>
                          <GisCard data={item} />
                      </li>
                  )
              })}
          </ul>
    </Container>
  )
}

export default GisList