import { useEffect, useState } from 'react';
import { fetchData, youtubeOptions } from '../../utils/fetchData';
import { useOutletContext } from 'react-router';
import { nanoid } from 'nanoid';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import styles from './DetailRelatedVideo.module.css';
import ErrorDialog from '../../shared/ErrorDialog';

export default function DetailRelatedVideo() {
    const { exerciseDetail, setIsLoading, errorMessage, setErrorMessage } = useOutletContext();
    const [exerciseVideos, setExerciseVideos] = useState([]);
    const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

    const youtubeVideoFetch = async () => {
        try {
            const { data } = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetail.name} exercise`, youtubeOptions);
            setExerciseVideos(data.contents);
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    useEffect(() => {
        youtubeVideoFetch();
    }, []);

    return (
        <>
            {!errorMessage ? <div className={styles.videoContainer}>
                <h2>Watch <span>{exerciseDetail.name}</span> exercise videos </h2>
                <div className={styles.cardContainer}>
                    {exerciseVideos.length != 0 ? exerciseVideos
                        .slice(0, 6)
                        .map(item => {
                            return (
                                <div key={nanoid()} className={styles.videoCard}>
                                    <a href={`https://www.youtube.com/watch?v=${item.video.videoId}`} target='_blank'>
                                        <img src={item.video.thumbnails[0].url} alt={item.video.title} />
                                        <h5>{item.video.title}</h5>
                                        <h6>{item.video.channelName}</h6>
                                    </a>
                                </div>
                            );
                        })
                        : <h1>Loading...</h1>}
                </div>
            </div>
                : <ErrorDialog errorMessage={errorMessage} />
            }
        </>
    );
}
