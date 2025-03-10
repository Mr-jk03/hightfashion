import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import {FC, useState} from 'react'

type Props = {
  handleFilter?: (data: string) => void
}

export const InputFilterEcagoModal: FC<Props> = ({handleFilter}) => {
  const [value, setValue] = useState('')

  const handleFilterInfo = () => {
    if (handleFilter) handleFilter(value.trim())
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleFilterInfo()
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleFilterInfo()
  }
  return (
    <Paper component='form' sx={{p: '2px 4px', display: 'flex', alignItems: 'center',height:'100%', width: '100%'}}
      onSubmit={handleSubmit}
    >
      <IconButton onClick={handleFilterInfo} type='button' sx={{p: '10px'}} aria-label='search'>
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ml: 1, flex: 1}}
        placeholder='Tìm kiếm'
        inputProps={{'aria-label': 'Tìm kiếm'}}
        value={value}
        onKeyDown={handleKeyDown}
        onChange={(event) => setValue(event.target.value)}
      />
    </Paper>
  )
}
