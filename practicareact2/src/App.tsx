import { useForm } from 'react-hook-form';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { usePapaParse } from 'react-papaparse';
import {useNavigate} from 'react-router-dom';

interface FormData {
  txtArchi: string[];
  txtSeparator: string;
}

const App = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const navigate = useNavigate()

  const parse: any = usePapaParse();

  const onSubmit = (data: FormData) => {
    const archivo: any = data.txtArchi[0];
    const delimiter: string = data.txtSeparator || ';';
    
    parse.readString(archivo, {
      delimiter: delimiter,
      header: false,
      dynamicTyping: true,
      complete: (result: any) => {
        console.log('Datos procesados:', result.data);
        navigate('/procesar', {state: {contenido: result.data}});
      },
    });
  };

  return (
    <Container maxWidth="sm" style={{ maxWidth: 'md', marginTop: '15px' }}>
      <Paper elevation={3} style={{ padding: '5px' }}>
        <Grid container alignItems="center" direction="column" spacing={2} style={{ padding: '5px' }}>
          <Typography variant="h5">Lectura de archivos csv</Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Grid container spacing={2} direction="column">
              <Grid>
                <input
                  {...register('txtArchi', { required: true })}
                  type="file"
                  style={{ width: '100%', padding: '5px', fontSize: '13px' }}
                />
              </Grid>
              <Grid>
                <label htmlFor="txtSeparator">Separador:</label>
                <input 
                    {...register('txtSeparator', { required: true })}
                    type='text'
                    style={{ width: '8%', padding: '5px', fontSize: '13px', margin: '4px' }}
                />
                <button type="submit" style={{ padding: '10px 15px', fontSize: '13px', margin: '4px'  }}>
                  Procesar
                </button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Container>
  );
};

export default App;