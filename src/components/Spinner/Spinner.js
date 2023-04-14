import React from 'react';
import spinnerImg from '../../assests/images/loading.gif'

const Spinner = () => {
  return (
    <div>
      <img src={spinnerImg} alt='' className='d-block m-auto' style={{width: '200px', color: '#eee8e4'}}/>
    </div>
  );
}

export default Spinner;
