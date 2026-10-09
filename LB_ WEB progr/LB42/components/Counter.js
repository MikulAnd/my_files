import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../store/actions';

const Counter = () => {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div className="card counter-card">
      <h2>Лічильник Redux: <span className="counter-value">{count}</span></h2>
      <div className="btn-container">
        <button className="btn btn-inc" onClick={() => dispatch(increment())}>
          +1
        </button>
        <button className="btn btn-dec" onClick={() => dispatch(decrement())}>
          -1
        </button>
        <button className="btn btn-reset" onClick={() => dispatch(reset())}>
          Скинути
        </button>
      </div>
    </div>
  );
};

export default Counter;