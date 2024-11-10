'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";

const getData = async (searchQueryPArams: string, setData: Dispatch<SetStateAction<string>>) => {
    const russianSearchText = await fetch('/api/v1/translate', {
        method: 'POST',
        body: JSON.stringify({
            prompt: {
                from: 'English',
                info: 'Russian',
                text: `${searchQueryPArams}`,
            }
        })
    });

    const { result } = await russianSearchText.json();
    const { translate } = result;

    const searchQueryText = await fetch('/api/v1/search-query', {
        method: 'POST',
        body: JSON.stringify({
            prompt: {
                text: translate,
            }
        })
    });

    const { text, searchQuery } = await searchQueryText.json();

    const pageMarkup = await fetch('/api/v1/search-links', {
        method: 'POST',
        body: JSON.stringify({
            rq: searchQuery,
        })
    });

    const data = await pageMarkup.text();

    setData(data)
}

export default function Page(props: { params: {}, searchParams: { search: string } }) {
    const [markup, setMarkup] = useState('');
    const searchQueryPArams = props.searchParams.search.split('_').join(' ');

    useEffect(() => {
        getData(searchQueryPArams, setMarkup);
    }, [])

    useEffect(() => {
        const block = document.getElementById('page');
        if (block) {
            block.innerHTML = markup;
        }
    }, [markup])

    return <div>
        <h1>Links</h1>
        <div id="page"></div>
    </div>;
}
