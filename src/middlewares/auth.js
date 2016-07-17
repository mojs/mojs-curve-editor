export default function authMiddleware() {
  return next => action => {
    const { auth, type, ...rest } = action;

    if (!auth) return next(action);

    const SUCCESS = type + '_SUCCESS';
    const REQUEST = type + '_REQUEST';
    const FAILURE = type + '_FAILURE';
    next({ ...rest, type: REQUEST });
    return auth
      .then(req => {
        if(req.status === 200) {
          localStorage.setItem('user_id', req.data.user.id)
          localStorage.setItem('token', req.data.token)
        }
        next({ ...rest, req, type: SUCCESS });
        return true;
      })
      .catch(error => {
        if(req.status !== 200) {
          localStorage.removeItem('user_id')
          localStorage.removeItem('token')
        }
        next({ ...rest, error, type: FAILURE });
        console.log(error);
        return false;
      });
   };
}
