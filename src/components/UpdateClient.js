import { Stack, TextField } from '@mui/material'
import React from 'react'


function UpdateClient({ client }) {
    return (
        <Stack sx={{
            '& .MuiTextField-root': { m: 2, width: '40ch' },
        }}>
            <TextField
                label="Имя"
                id="contactName"
                defaultValue={client.contactName}
                size="small"
            />
            <TextField
                label="Имя"
                id="contactName"
                defaultValue={client.contactName}
                size="small"
            />
            <TextField
                label="Имя"
                id="contactName"
                defaultValue={client.contactName}
                size="small"
            />
            <TextField
                label="Имя"
                id="contactName"
                defaultValue={client.contactName}
                size="small"
            />
            <TextField
                label="Имя"
                id="contactName"
                defaultValue={client.contactName}
                size="small"
            />
            <TextField
                label="Имя"
                id="contactName"
                defaultValue={client.contactName}
                size="small"
            />
            <TextField
                label="Имя"
                id="contactName"
                defaultValue={client.contactName}
                size="small"
            />
            <TextField
                label="Имя"
                id="contactName"
                defaultValue={client.contactName}
                size="small"
            />
        </Stack>
    )
}

export default UpdateClient