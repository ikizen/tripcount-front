import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import axios from "axios";
import React from "react";
// import { REACT_APP_BACKEND_URL } from "../constants/constants";

const backEndURL_TAXI = `https://tripcount-back-production.up.railway.app/transport`;
// const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/hotel`;

// const backEndURL_ANYTIME = `${process.env.REACT_APP_BACKEND_URL}/anytime`;

export const TransportComponent = ({ handleChange, transport }) => {
    const [parsedTaxi, setParsedTaxi] = React.useState(0);
    axios.get(`${backEndURL_TAXI}`).then((response) => {
        console.log(response.data);
        setParsedTaxi(response.data);
        // return parsedTaxi + response.data;
        // return response.data;
    });

    // export const AnytimeComponent = ({ handleChange, anytime }) => {
    //     const [parsedAnytime, setParsedAnytime] = React.useState(0);
    //     axios.get(`${backEndURL_ANYTIME}`).then((response) => {
    //         console.log(response.data);
    //         setParsedAnytime(response.data);
    //         // return parsedTaxi + response.data;
    //         // return response.data;
    //     });

    return (
        <>
            <div className="flex flex-row justify-center mt-6">
                <h2>Tasmaldaýym</h2>
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
                }}
            >
                <ToggleButtonGroup
                    value={transport}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value="800" sx={{ color: "#494c57" }}>
                        Avtobýs
                    </ToggleButton>
                    <ToggleButton value="4400" sx={{ color: "#494c57" }}>
                        Taksı
                    </ToggleButton>
                    <ToggleButton value="10500" sx={{ color: "#494c57" }}>
                        Anytime
                    </ToggleButton>
                    {/* 10.500 тенге в день  */}
                </ToggleButtonGroup>
            </Box>
        </>
    );
};
