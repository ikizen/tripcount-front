import "./App.css";

import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";

import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { SliderComponent } from "./components/slider";
import { HouseComponent } from "./components/house";
import { TransportComponent } from "./components/transport";
import { PlacesComponent } from "./components/places";

import { placeList } from "./data/place-list.js";
import { astPlaceList } from "./data/ast";
import { dayList } from "./data/day-list.js";
import { houseList } from "./data/house-list";
import { transportList } from "./data/transport-list";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import photoAlm from "./img/almaty2.jpg";
import photoAst from "./img/astana.jpg";
import photoQar from "./img/karaganda1.jpg";
import photoShym from "./img/shym.jpg";
import photoAqt from "./img/aqtau.jpg";

import axios from "axios";
import { ClassNames } from "@emotion/react";

// const BACKEND_URL = "http://localhost:8080/hotel";
const BACKEND_URL = "https://tripcount-back-production.up.railway.app";

// dialog card Material UI STARTS HERE
// это
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));
// и это - компоненты

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    // вот так делать можно, делаешь conditional и если он исполняется - срабатывает этот return. если 5 > 6 === false - сработает следующий ретёрн
    // if (5 > 6) {
    //     return <p>Жума лохстер</p>;
    // }

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

// FUNCTION STARTS
function App() {
    //RETURN STARTS
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="cards" element={<Cards />} />
            </Routes>
        </>
    );
}
function Home() {
    return (
        <>
            <div className="homePage flex flex-col items-center	justify-center">
                <h1 className=" ">Saparǵa</h1>
                <Link to="/cards" className="go-to-cards flex flex-row">
                    <div className="home-text pr-1 sm:text-xs flex items-center">
                        bagyt tańdańyz
                    </div>
                    {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg> */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </Link>
            </div>
        </>
    );
}

function Cards() {
    const [parsed, setParsed] = React.useState(0);
    const [house, setHouse] = React.useState(0);
    const [transport, setTransport] = React.useState(0);
    const [places, setPlaces] = React.useState(0);
    const [sum, setSum] = React.useState(0);
    const [sliderDay, setSliderDay] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        let sum =
            parseInt(house) * sliderDay +
            parseInt(transport) * sliderDay +
            places;
        setSum(sum);
    }, [house, sliderDay, transport, places]);

    React.useEffect(() => {
        axios.get(`${BACKEND_URL}`).then((response) => {
            parsed(response.data);
        });
        console.log(parsed);
    }, []);

    const handleChangeHouse = (event, newHouse) => {
        setHouse(newHouse);
        const value = event.target.value;
    };
    const handleChangeTransport = (event, newTransport) => {
        setTransport(newTransport);
        const value = event.target.value;
    };
    const handleChangeDay = (event, day) => {
        const value = event.target.value;
        setSliderDay(day);
    };
    const pickPlaces = (event, value) => {
        const placeValue = value
            .map((price) => price.value)
            .reduce((partialSum, a) => partialSum + a, 0);

        setPlaces(placeValue);
    };
    const openCard = () => {
        setOpen((prev) => !prev);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="cardPage">
                <nav className="card-page-nav flex-1 flex justify-center pt-2 pb-2">
                    <Link className="flex flex-row" to="/">
                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-7 w-7"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="header">Saparǵa</div>
                    </Link>
                </nav>
                <div className="cards-div flex flex-row justify-center flex-wrap">
                    <div className="qar-card">
                        <Card
                            sx={{ maxWidth: 200 }}
                            onClick={handleClickOpen}
                            className="card"
                            elevation={6}
                            // onClickAway={handleClickAway}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="60"
                                    image={photoQar}
                                    alt="Almaty Photo"
                                />
                                <CardContent
                                    className="card-content"
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                        fontFamily: "Playfair Display",
                                    }}
                                >
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        sx={{
                                            fontWeight: "bold",
                                            letterSpacing: 3,
                                            color: "#494c57",
                                        }}
                                    >
                                        Qaraǵandy
                                    </Typography>
                                    <Typography
                                        className="card-content-text"
                                        variant="body2"
                                        sx={{
                                            fontFamily: "Monospace",
                                        }}
                                    >
                                        Uly adamdar dúnıege kelgen qala
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <BootstrapDialogTitle
                                id="customized-dialog-title"
                                className="card-opened flex justify-center"
                                onClose={handleClose}
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                Tıisti nusqalardy tańdańyz
                            </BootstrapDialogTitle>
                            <DialogContent
                                dividers
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <div className="card-function">
                                    <SliderComponent
                                        handleChange={handleChangeDay}
                                    />
                                    <HouseComponent
                                        handleChange={handleChangeHouse}
                                        house={house}
                                    />

                                    <TransportComponent
                                        handleChange={handleChangeTransport}
                                        transport={transport}
                                    />

                                    <div className="text-center mt-12 text-3xl">
                                        {sum}₸
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <Button
                                    autoFocus
                                    onClick={handleClose}
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                    }}
                                >
                                    Jabý
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </div>
                    <div className="alm-card">
                        <Card
                            sx={{ maxWidth: 200 }}
                            onClick={handleClickOpen}
                            className="card"
                            elevation={6}
                            // onClickAway={handleClickAway}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="60"
                                    image={photoAlm}
                                    alt="Almaty Photo"
                                />
                                <CardContent
                                    className="card-content"
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                        fontFamily: "Playfair Display",
                                    }}
                                >
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        sx={{
                                            fontWeight: "bold",
                                            letterSpacing: 3,
                                            color: "#494c57",
                                        }}
                                    >
                                        Almaty
                                    </Typography>
                                    <Typography
                                        className="card-content-text"
                                        variant="body2"
                                        sx={{
                                            fontFamily: "Monospace",
                                        }}
                                    >
                                        Myń boıauly, korkem ári almaly qala
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <BootstrapDialogTitle
                                id="customized-dialog-title"
                                className="card-opened flex justify-center"
                                onClose={handleClose}
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                Tıisti nusqalardy tańdańyz
                            </BootstrapDialogTitle>
                            <DialogContent
                                dividers
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <div className="card-function">
                                    <SliderComponent
                                        handleChange={handleChangeDay}
                                    />
                                    <HouseComponent
                                        handleChange={handleChangeHouse}
                                        house={house}
                                    />
                                    <TransportComponent
                                        handleChange={handleChangeTransport}
                                        transport={transport}
                                    />
                                    <PlacesComponent
                                        placeList={placeList}
                                        pickPlaces={pickPlaces}
                                    />
                                    <div className="text-center mt-12 text-3xl">
                                        {sum}₸
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <Button
                                    autoFocus
                                    onClick={handleClose}
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                    }}
                                >
                                    Jabý
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </div>
                    <div className="ast-card">
                        <Card
                            sx={{ maxWidth: 200 }}
                            onClick={handleClickOpen}
                            className="card"
                            elevation={6}
                            // onClickAway={handleClickAway}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="60"
                                    image={photoAst}
                                    alt="Almaty Photo"
                                />
                                <CardContent
                                    className="card-content"
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                        fontFamily: "Playfair Display",
                                    }}
                                >
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        sx={{
                                            fontWeight: "bold",
                                            letterSpacing: 3,
                                            color: "#494c57",
                                        }}
                                    >
                                        Astana
                                    </Typography>
                                    <Typography
                                        className="card-content-text"
                                        variant="body2"
                                        sx={{
                                            fontFamily: "Monospace",
                                        }}
                                    >
                                        Qazaqstan Respýblıkasynyń ádemi astanasy
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <BootstrapDialogTitle
                                id="customized-dialog-title"
                                className="card-opened flex justify-center"
                                onClose={handleClose}
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                Tıisti nusqalardy tańdańyz
                            </BootstrapDialogTitle>
                            <DialogContent
                                dividers
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <div className="card-function">
                                    <SliderComponent
                                        handleChange={handleChangeDay}
                                    />
                                    <HouseComponent
                                        handleChange={handleChangeHouse}
                                        house={house}
                                    />
                                    <TransportComponent
                                        handleChange={handleChangeTransport}
                                        transport={transport}
                                    />
                                    <PlacesComponent
                                        placeList={astPlaceList}
                                        pickPlaces={pickPlaces}
                                    />
                                    <div className="text-center mt-12 text-3xl">
                                        {sum}₸
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <Button
                                    autoFocus
                                    onClick={handleClose}
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                    }}
                                >
                                    Jabý
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </div>
                    <div className="shym-card">
                        <Card
                            sx={{ maxWidth: 200 }}
                            onClick={handleClickOpen}
                            className="card"
                            elevation={6}
                            // onClickAway={handleClickAway}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="60"
                                    image={photoShym}
                                    alt="Almaty Photo"
                                />
                                <CardContent
                                    className="card-content"
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                        fontFamily: "Playfair Display",
                                    }}
                                >
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        sx={{
                                            fontWeight: "bold",
                                            letterSpacing: 3,
                                            color: "#494c57",
                                        }}
                                    >
                                        Shymkent
                                    </Typography>
                                    <Typography
                                        className="card-content-text"
                                        variant="body2"
                                        sx={{
                                            fontFamily: "Monospace",
                                        }}
                                    >
                                        Qazaq halqynyń salt-dástúrleri
                                        qurmetteletin qala
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <BootstrapDialogTitle
                                id="customized-dialog-title"
                                className="card-opened flex justify-center"
                                onClose={handleClose}
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                Tıisti nusqalardy tańdańyz
                            </BootstrapDialogTitle>
                            <DialogContent
                                dividers
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <div className="card-function">
                                    <SliderComponent
                                        handleChange={handleChangeDay}
                                    />
                                    <HouseComponent
                                        handleChange={handleChangeHouse}
                                        house={house}
                                    />
                                    <TransportComponent
                                        handleChange={handleChangeTransport}
                                        transport={transport}
                                    />
                                    <PlacesComponent
                                        placeList={placeList}
                                        pickPlaces={pickPlaces}
                                    />
                                    <div className="text-center mt-12 text-3xl">
                                        {sum}₸
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <Button
                                    autoFocus
                                    onClick={handleClose}
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                    }}
                                >
                                    Jabý
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </div>
                    <div className="aqt-card">
                        <Card
                            sx={{ maxWidth: 200 }}
                            onClick={handleClickOpen}
                            className="card"
                            elevation={6}
                            // onClickAway={handleClickAway}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="60"
                                    image={photoAqt}
                                    alt="Almaty Photo"
                                />
                                <CardContent
                                    className="card-content"
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                        fontFamily: "Playfair Display",
                                    }}
                                >
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        sx={{
                                            fontWeight: "bold",
                                            letterSpacing: 3,
                                            color: "#494c57",
                                        }}
                                    >
                                        Aqtaý
                                    </Typography>
                                    <Typography
                                        className="card-content-text"
                                        variant="body2"
                                        sx={{
                                            fontFamily: "Monospace",
                                        }}
                                    >
                                        Kaspıı jaǵalaýyndaǵy ádemi qala{" "}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <BootstrapDialogTitle
                                id="customized-dialog-title"
                                className="card-opened flex justify-center"
                                onClose={handleClose}
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                Tıisti nusqalardy tańdańyz
                            </BootstrapDialogTitle>
                            <DialogContent
                                dividers
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <div className="card-function">
                                    <SliderComponent
                                        handleChange={handleChangeDay}
                                    />
                                    <HouseComponent
                                        handleChange={handleChangeHouse}
                                        house={house}
                                    />
                                    <TransportComponent
                                        handleChange={handleChangeTransport}
                                        transport={transport}
                                    />
                                    <PlacesComponent
                                        placeList={placeList}
                                        pickPlaces={pickPlaces}
                                    />
                                    <div className="text-center mt-12 text-3xl">
                                        {sum}₸
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions
                                sx={{
                                    backgroundColor: "#faf0d0",
                                    color: "#494c57",
                                }}
                            >
                                <Button
                                    autoFocus
                                    onClick={handleClose}
                                    sx={{
                                        backgroundColor: "#faf0d0",
                                        color: "#494c57",
                                    }}
                                >
                                    Jabý
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
