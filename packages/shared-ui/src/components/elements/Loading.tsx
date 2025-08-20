import { Backdrop, CircularProgress } from '@mui/material'

export const Loading = ({ isLoading = false }) => {
  return (
    <Backdrop
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0)', 
        color: '#1976d2', // Primary color
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}