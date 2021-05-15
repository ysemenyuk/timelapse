import { useSelector } from 'react-redux';

export default (thunk) => {
  const status = useSelector((state) => state.thunk[thunk.typePrefix]);
  const isPending = status === 'pending';
  const isFulfilled = status === 'fulfilled';
  const isRejected = status === 'rejected';

  return { status, isPending, isFulfilled, isRejected };
};
