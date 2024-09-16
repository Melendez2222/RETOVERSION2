import CheckIcon from '@mui/icons-material/Check';
import { Alert, Stack } from '@mui/material';
export function Success(){
    return(
        <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Producto actualizado correctamente.
      </Alert>
    </Stack>
    );
}