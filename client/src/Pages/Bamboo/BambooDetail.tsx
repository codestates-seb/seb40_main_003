import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProfileCard, ViewCounter } from "../../Components/GlobalComponents";
import { bambooDetailTypes } from "../../types/bambooDetailTypes";

const BambooDetail = () => {
const [isLoading, setIsLoading] = useState(true);
const [data, setData] = useState<bambooDetailTypes | null>(null);
const { id } = useParams();

    useEffect(() => {
        try {
          axios.get(`/bamboo/${id}`).then((res) => {
            setData(res.data);
            setIsLoading(false);
        });
        } catch (err) {
        console.log(err);
        }
    }, []);

    return !isLoading && data !== null ? (
        <>
        <Link to={`/bamboo/${data.communityId}`}>a</Link>
        </>
    ) : (
        <>loading...</>
    );
    };

export default BambooDetail;