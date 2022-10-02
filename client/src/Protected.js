import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {getToken, reset} from "./slices/authSlice";


const Protected = ({children }) => {
   const dispatch = useDispatch();
 const {user,isLoading,isError, isSuccess, message, getTokenLoading} = useSelector((state)=> state.auth);
 dispatch(getToken());
 console.log(user);
 if (user === null) {
 return <Navigate to="/user/login" replace />;
 }
 return children;
};
export default Protected;