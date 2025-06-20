import { useEffect, useState} from 'react';
import { fetchData, youtubeOptions } from '../../utils/fetchData';
import { useOutletContext } from 'react-router';
import 'react-horizontal-scrolling-menu/dist/styles.css';

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
    console.log(exerciseVideos.map(video => video.video));
    return (
        <div className="videoContainer">
            {exerciseVideos
                .slice(0, 3)
                .map(item => {
                    return (
                        <div key={item.id} className='videoCard'>
                            <a href={`https://www.youtube.com/watch?v=${item.video.videoId}`} target='_blank'>
                                <img src={item.video.thumbnails[0].url} alt={item.video.title} />
                            </a>
                        </div>
                    );
                })}
        </div>
    );
}
