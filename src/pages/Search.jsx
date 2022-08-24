import React, {useState} from 'react';
import Button from "@mui/material/Button";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Search = () => {
	const [queryWordsMatch, setQueryWordsMatch] = useState("allWords");
	const [searchOrder, setSearchOrder] = useState("newest");
	const [inputText, setInputText] = useState("");
	const searchScope = {
		"categories": false,
		"contacts": false,
		"content": false,
		"newsfeeds": false,
		"tags": false
	};
	const [responseData, setResponseData] = useState([]);

	const search = () => {
		const navigate = useNavigate;
		for(let i = 0; i < 5; i++) {
			const arr = ["categories", "contacts", "content", "newsfeeds", "tags"];
			if(document.getElementById(`area-${arr[i]}`).checked){
				searchScope[arr[i]] = true
			} if(document.getElementById(`area-${arr[i]}`).checked === false){
				searchScope[arr[i]] = false;
			} 
		}
		axios.get(`http://10.200.24.103:8089/account/?search=${inputText}`)
			.then(response => {
				console.log(response.data)
			})
		// postData.inputText = inputText;
		// postData.queryWordsMatch = queryWordsMatch;
		// postData.searchOrder = searchOrder;
		// postData.searchScope = searchScope;
	};

	const changeQueryType = (value) => {
		setQueryWordsMatch(value)
	};
	const changeSearchOrdering = (value) => {
		setSearchOrder(value)
	};

    return (
        <div className='page-body'>
            <div className="search__inputs clearfix">
		        <input type="text" placeholder="Текст для поиска" onChange={(t) => setInputText(t.target.value)} className="search__input" value={inputText}/>
		        <Button variant="outlined" className="search__btn" onClick={() => search()}>
			        Искать
                </Button>
	        </div>
            <fieldset className="search__phrases search__fieldset">
		        <legend className="search__fieldset_legend">Совпадение</legend>
		        <div className="search__phrases_box">   
			        <div className="controls">

	                    <label id="searchphraseall-lbl" className='option-radio' onClick={(t) => changeQueryType(t.target.value)}>
	                        <input type="radio" name='search__radio' defaultChecked className="search__radio"  value="allWords"/>
                                Все слова
	                    </label>

                        <label id="searchphraseall-lbl" className='option-radio' onClick={(t) => changeQueryType(t.target.value)}>
	                        <input type="radio" name='search__radio' className="search__radio"  value="anyOfWords"/>
                                Любое из слов
	                    </label>
	                    
                        <label id="searchphraseall-lbl" className='option-radio' onClick={(t) => changeQueryType(t.target.value)}>
	                        <input type="radio" name='search__radio' className="search__radio"  value="exactMatch"/>
                                Точное совпадение
	                    </label>

                    </div>
		        </div>

		    <div className="search__ordering_box">
			    <label className="search__ordering__label">
				    Порядок
                </label>
			    <select id="ordering" onChange={(t) => changeSearchOrdering(t.target.value)} className="inputbox">
	                <option value="newest">Новые первыми</option>
	                <option value="oldest">Старые первыми</option>
	                <option value="popular">Популярные первыми</option>
	                <option value="alphabet">По алфавиту</option>
	                <option value="category">Категория</option>
                </select>
		    </div>

	        </fieldset>
            <fieldset className="search__only search__fieldset">
		        <legend className="search__fieldset_legend">Ограничение области поиска</legend>
				
                <label className="search__checkbox_label">
			        <input type="checkbox" className="search__checkbox" value="categories" id="area-categories"/>
			        Категории
                </label>
				<label className="search__checkbox_label">
			        <input type="checkbox" className="search__checkbox" value="contacts" id="area-contacts"/>
			        Контакты		
                </label>
				<label className="search__checkbox_label">
			        <input type="checkbox" className="search__checkbox" value="content" id="area-content"/>
			        Материалы		
                </label>
				<label className="search__checkbox_label">
			        <input type="checkbox" className="search__checkbox" value="newsfeeds" id="area-newsfeeds"/>
			        Ленты новостей		
                </label>
				<label className="search__checkbox_label">
			        <input type="checkbox" className="search__checkbox" value="tags" id="area-tags"/>
			        Метки	
                </label>
			</fieldset>
			<br/>
			<br/>
			<div className="search-response__wrapper">
				<div className="response__item">
					<h1>Header</h1>
					<p>...It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum....</p>
				</div>
			</div>
        </div>
    );
};

export default Search;