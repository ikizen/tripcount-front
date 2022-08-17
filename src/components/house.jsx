import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import axios from "axios";
import React from "react";
import { REACT_APP_BACKEND_URL } from "../constants/constants";

const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/hotel`;

// const BACKEND_URL = "https://saparga-back.vercel.app/hotel";
export const HouseComponent = ({ handleChange, house }) => {
    // const parsedHotel = 0;
    const [parsedHotel, setParsedHotel] = React.useState(0);
    axios.get(`${BACKEND_URL}`).then((response) => {
        // console.log(response.data);
        setParsedHotel(response.data);
    });

    const showHotels = () => {
        console.log("hotel clicked");
    };
    return (
        <>
            <div className="flex flex-row justify-center mt-6">
                <h2>Turatyn jerim</h2>
            </div>
            <Box
                className="mt-6"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "& > *": {
                        m: 1,
                    },
                    color: "#b1ddc6",
                }}
            >
                <ToggleButtonGroup
                    value={house}
                    exclusive
                    onChange={handleChange}
                    sx={{ color: "#494c57" }}
                >
                    <ToggleButton value="0" sx={{ color: "#494c57" }}>
                        Dostarymda
                    </ToggleButton>
                    <ToggleButton
                        onClick={showHotels}
                        value="27000"
                        sx={{ color: "#494c57" }}
                    >
                        Qonaq úıde
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </>
    );
};
