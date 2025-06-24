import { useEffect, useState } from 'react';
import { fetchData, youtubeOptions } from '../../utils/fetchData';
import { useOutletContext } from 'react-router';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import styles from './DetailRelatedVideo.module.css';

export default function DetailRelatedVideo() {
    const { exerciseDetail } = useOutletContext();
    const [exerciseVideos, setExerciseVideos] = useState([]);
    // console.log(exerciseDetail)
    const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

    const youtubeVideoFetch = async () => {
        const { data } = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetail.name} exercise`, youtubeOptions);
        setExerciseVideos(data.contents);
    };

    useEffect(() => {
        youtubeVideoFetch();
    }, []);
    return (
        <div className={styles.videoContainer}>
            <h2>Watch <span>{exerciseDetail.name}</span> exercise videos </h2>
            <div className={styles.cardContainer}>
                {exerciseVideos
                    .slice(0, 6)
                    .map(item => {
                        return (
                            <div key={item.id} className={styles.videoCard}>
                                <a href={`https://www.youtube.com/watch?v=${item.video.videoId}`} target='_blank'>
                                    <img src={item.video.thumbnails[0].url} alt={item.video.title} />
                                    <h5>{item.video.title}</h5>
                                    <h6>{item.video.channelName}</h6>
                                </a>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
