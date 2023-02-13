import { useContext } from 'react';
import AppContext from "../../Context/Context";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import "./Loader.css";

const Loader = () => {

    const [isLoading, setLoading] = useContext(AppContext).isLoading;

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Loader;
