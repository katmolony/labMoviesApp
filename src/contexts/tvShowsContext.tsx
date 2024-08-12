import React, { useState, useCallback } from "react";
import { BaseTVShowProps} from "../types/interfaces";


interface TvShowContextInterface {
    favourites: number[];
    addToFavourites: ((show: BaseTVShowProps) => void);
    removeFromFavourites: ((show: BaseTVShowProps) => void);
}
const initialContextState: TvShowContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {}
};

export const TvShowsContext = React.createContext<TvShowContextInterface>(initialContextState);

const TvShowsContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);

    const addToFavourites = useCallback((show: BaseTVShowProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(show.id)) {
                return [...prevFavourites, show.id];
            }
            return prevFavourites;
        });
    }, []);

    const removeFromFavourites = useCallback((show: BaseTVShowProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== show.id));
    }, []);

    return (
        <TvShowsContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
            }}
        >
            {children}
        </TvShowsContext.Provider>
    );
};

export default TvShowsContextProvider;