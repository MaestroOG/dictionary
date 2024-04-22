import React, { useEffect, useState } from 'react'
import './Dictionary.css'
import { FaPlay } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const Dictionary = () => {
    const [word, setWord] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);


    const getData = async (value) => {
        try {
            setLoading(true)
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`);
            let data = await response.json()
            console.log(data);
            setData(data[0])
            setLoading(false)
            setWord("")
        } catch (error) {
            console.error(error.message)
        }
    }


    // useEffect(() => {
    //     console.log(getData("hello"))
    //     console.log(data);
    // }, [])
    return (
        <div className="main-container">
            <div className="search-container">
                <input type="text" value={word} onChange={(e) => setWord(e.target.value)} id='word-input' placeholder='Enter word or phrase' />
                <CiSearch className='search-icon' onClick={() => getData(word)} />
            </div>
            {data ? (
                <>
                    <div className="heading-container">
                        <div className="heading-text">
                            <h1>{data && data.word}</h1>
                            <p className="pronounciation">{data && data.phonetics.map(phonetic => phonetic.hasOwnProperty('text') ? (
                                phonetic.text
                            ) : null)}</p>
                        </div>
                        <div className="heading-button">
                            <span className='button'><FaPlay /></span>
                        </div>
                    </div>
                    <div className="meaning-container">
                        {data && <p className='grammar'>{data.meanings[0].partOfSpeech}</p>}
                        {/* <p className="grammar">noun</p> */}
                        <div className="meaning-list">
                            <p id="meaning">Meaning</p>
                            <ul>
                                {data && data.meanings.map(meaning => meaning.definitions.map(def => {
                                    return <li key={def.definition}>{def.definition}</li>
                                }))}
                            </ul>
                        </div>
                    </div>
                    <div className="synonym-container">
                        <p id="meaning">Synonyms</p>
                        {data && data.meanings.map(meaning => meaning.synonyms.map((syn, i) => {
                            return <a href="#" key={i}>{syn}</a>
                        }))}
                        {/* <a href="#">electric keyboard</a> */}
                    </div>
                </>
            ) : (loading ? <div className='loading'>Loading...</div> : <div className='loading'>Enter a word</div>)}
        </div>
    )
}

export default Dictionary