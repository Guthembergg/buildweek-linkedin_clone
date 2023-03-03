import Spinner from 'react-bootstrap/Spinner';

function spinner() {
  return (
    <div style={{height: "100px"}} className='d-flex justify-content-center align-items-center'>
      <Spinner style={{height:"50px", width:"50px"}} animation="border" variant="primary" />
      </div>
  );
}

export default spinner;

