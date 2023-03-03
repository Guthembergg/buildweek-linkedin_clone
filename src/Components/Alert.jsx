import Alert from 'react-bootstrap/Alert';

const AlertError = () => {
  return (
        <Alert className='text-center' variant="danger">
            Fetch non andato a buon fine. RICARICA LA PAGINA!        
        </Alert>
  );
}

export default AlertError;