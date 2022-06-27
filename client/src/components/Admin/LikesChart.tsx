import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { AppState } from '../../redux/app-state';
import { ActionType } from '../../redux/action-type';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IChartLikes } from '../../models/IChartLikes';
import classes from './LikesChart.module.css';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Chart = () => {

    useEffect(() => {
        window.scroll(0, 0);
        document.title = "GlobeFlight - Likes Chart";
    }, []);

    const dispatch = useDispatch();

    const vacationArray = useSelector((state: AppState) => state.vacationsDataForChart);

    const getVacationsData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/likes");
            const vacationsData = response.data;
            dispatch({ type: ActionType.GetVacationForChart, payload: vacationsData });
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getVacationsData();
    }, []);

    const vacationsLabels = vacationArray.map((vacation: IChartLikes) => "ID #" + vacation.id + "\n" + vacation.city);
    const vacationsLikes = vacationArray.map((vacation: IChartLikes) => vacation.vacationLikes);

    const labels = vacationsLabels;

    const data = {
        labels,
        datasets: [
            {
                label: 'Likes',
                data: vacationsLikes,
                backgroundColor: 'rgba(83,138,214,1)'
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Likes For Every Vacation',
            },
        },
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
                    stepSize: 1,
                }
            }
        },
        layout: {
            padding: 20
        }
    }

    return (
        <div style={{ width: "95%", margin: "0 auto", paddingTop: "80px" }}>
            {vacationArray.length === 0 && <label className={classes["error-message"]}>There was an error while trying to load the vacations list. Please head to the main page and enter the chart again.</label>}
            {vacationArray.length > 0 && <Bar style={{ backgroundColor: "white" }} height={"550"} options={options} data={data} />}
        </div>
    );
}

export default Chart;