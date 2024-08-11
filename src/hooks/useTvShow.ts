import { useEffect, useState } from "react";
import { getTvShow } from '../api/tmdb-api'
import { TvShowDetailsProps } from '../types/interfaces'

type MovieHookReturnType = [TvShowDetailsProps | undefined, React.Dispatch<React.SetStateAction<TvShowDetailsProps | undefined>>];

const useTvShow  = (id: string):MovieHookReturnType  => {
    const [show, setShow] = useState<TvShowDetailsProps>();
    useEffect(() => {
        getTvShow(id).then(show => {
            setShow(show);
        });
    }, [id]);
    return [show, setShow];
};

export default useTvShow
