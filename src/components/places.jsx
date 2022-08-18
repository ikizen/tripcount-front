import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// import { REACT_APP_BACKEND_URL } from "../constants/constants";

export const PlacesComponent = ({ placeList, pickPlaces }) => {
    return (
        <>
            <div className="flex flex-row justify-center mt-6">
                <h2>Barý josparlarym</h2>
            </div>
            <div className="mt-12 flex justify-center">
                <Autocomplete
                    multiple
                    sx={{
                        borderColor: "#494c57",
                        backgroundColor: "#494c57",
                        color: "#494c57",
                    }}
                    limitTags={2}
                    id="multiple-limit-tags"
                    options={placeList}
                    onChange={pickPlaces}
                    getOptionLabel={(option) => option.name}
                    // defaultValue={[placeList[0]]}
                    renderInput={(params) => {
                        return (
                            <TextField
                                {...params}
                                label="Saıahat oryndary"
                                placeholder="Tańda"
                                // color="#494c57"
                                sx={{
                                    notchedOutline: {
                                        borderWidth: "1px",
                                        borderColor: "yellow !important",
                                    },
                                    color: "#494c57",
                                    borderColor: "#494c57",
                                }}
                            />
                        );
                    }}
                    // sx={{ width: "300px", borderColor: "#494c57" }}
                />
            </div>
        </>
    );
};
