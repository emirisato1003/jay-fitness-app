
export const fetchData = async (url, options) => {
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(res.status);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err.message);
    } finally {

    }

};