import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import MyLoader from "../components/UI/MyLoader/MyLoader";
import { useFetching } from "../hooks/useFetching";
import TextField from "@mui/material/TextField/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import FormControl from "@mui/material/FormControl";

const Search = props => {
  const [responseData, setResponseData] = useState([]);
  const [queryWordsMatch, setQueryWordsMatch] = useState("allWords");
  const [searchOrder, setSearchOrder] = useState("newest");
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNumberOfMatches, setShowNumberOfMatches] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const searchScope = {
    categories: false,
    content: false,
    newsfeeds: false,
    journal: false
  };
  const [departmentsData, setDepartmentsData] = useState([]);
  const [npaNewsData, setNpaNewsData] = useState([]);
  const [profcomData, setProfcomData] = useState([]);
  const [journalData, setJournalData] = useState([]);
  useEffect(() => {
    useFetching({}, setDepartmentsData, "department/", "get", setErrorMessage);
    useFetching({}, setNpaNewsData, "npa/", "get", setErrorMessage);
    useFetching({}, setProfcomData, "profcom/", "get", setErrorMessage);
    useFetching({}, setJournalData, "journal/", "get", setErrorMessage);
  }, []);

  function checkArg(obj, key, searchKey) {
    if (
      key === "photo" ||
      key === "image" ||
      key === "id" ||
      key === "is_active" ||
      key === "is_staff" ||
      key === "role" ||
      key === "password" ||
      key === "activation_code" ||
      key === "author"
    ) {
      return false;
    }
    if (
      JSON.stringify(obj[key])
        .toLowerCase()
        .includes(searchKey.toLowerCase())
    ) {
      return true;
    }
  }

  function filterIt(arr, searchKey) {
    return arr.filter(obj =>
      Object.keys(obj).some(key => checkArg(obj, key, searchKey))
    );
  }

  async function filterWithInput(inputText) {
    let depRes = [],
      journalRes = [],
      npaRes = [],
      profcomRes = [];
    // check global scope
    if (Object.values(searchScope).every(value => value === false)) {
      Object.keys(searchScope).forEach(v => (searchScope[v] = true));
    }
    if (searchScope.categories === true) {
      depRes = await filterIt(departmentsData, inputText);
    }
    if (searchScope.content === true) {
      npaRes = await filterIt(npaNewsData, inputText);
    }
    if (searchScope.newsfeeds === true) {
      profcomRes = await filterIt(profcomData, inputText);
    }
    if (searchScope.journal === true) {
      journalRes = await filterIt(journalData, inputText);
    }
    const arr = [];

    if (depRes.length !== 0) {
      let parentIndex;
      let parentName;

      for (let i = 0; i < depRes.length; i++) {
        for (let j = 0; j < departmentsData.length; j++) {
          if (departmentsData[j].title === depRes[i].parent) {
            parentName = departmentsData[j].title;
            parentIndex = departmentsData[j].id;
          }
        }
        arr.push({
          page: "????????????????: " + parentName,
          text: "???? ???????? ???????????????? ?????????????? ????????????????????",
          link: `/department/${parentIndex}`,
          pageNumber: 1
        });
      }
    }
    if (npaRes.length !== 0) {
      for (let i = 0; i < npaRes.length; i++) {
        arr.push({
          page: "????????????????: ?????? - " + npaRes[i].title,
          text: "???? ???????? ???????????????? ?????????????? ????????????????????",
          link: `/npa/${npaRes[i].id}`,
          pageNumber: 3
        });
      }
    }
    if (profcomRes.length !== 0) {
      for (let i = 0; i < profcomRes.length; i++) {
        arr.push({
          page: "????????????????: ??????????????",
          text: "???? ???????? ???????????????? ?????????????? ????????????????????",
          link: `/profcom/${profcomRes[i].id}`,
          pageNumber: 2
        });
      }
    }
    if (journalRes.length !== 0) {
      for (let i = 0; i < journalRes.length; i++) {
        arr.push({
          page: "????????????????: ????????????",
          text: "??????????????: " + journalRes[i].reason,
          link: `/journal`,
          pageNumber: 5
        });
      }
    }
    return arr;
  }

  const search = async () => {
    setIsLoading(true);
    if (inputText.endsWith(" "))
      setInputText(inputText.slice(0, inputText.length - 1));
    let textArr = inputText.split(" ");
    let searchArray = [];
    console.log(textArr);

    if (queryWordsMatch === "allWords") {
      for (let i = 0; i < textArr.length; i++) {
        searchArray.push(...(await filterWithInput(textArr[i])));
      }
    } else {
      searchArray = await filterWithInput(inputText);
    }
    setShowNumberOfMatches(true);
    // delete duplicates
    const keys = ["page", "link"];
    const filtered = searchArray.filter(
      (s => o => (k => !s.has(k) && s.add(k))(keys.map(k => o[k]).join("|")))(
        new Set()
      )
    );
    // sort
    console.log(filtered);
    setResponseData(filtered);
    setTimeout(() => setIsLoading(false), 250);
  };

  const changeQueryType = value => {
    setQueryWordsMatch(value);
  };
  const changeSearchOrdering = value => {
    setSearchOrder(value);
  };

  return (
    <div className="page-body">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={9}>
          <TextField
            type="text"
            fullWidth
            label="????????????"
            variant="outlined"
            value={inputText}
            onChange={i => setInputText(i.target.value)}
            onKeyPress={key => {
              if (key.key === "Enter") search();
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="outlined"
            onClick={search}
            xs={4}
            fullWidth
            size="large"
          >
            ????????????
          </Button>
        </Grid>
      </Grid>
      <fieldset className="search__phrases search__fieldset">
        <legend className="search__fieldset_legend">????????????????????</legend>
        <div className="search__phrases_box">
          <div className="controls">
            <label
              id="searchphraseall-lbl"
              className="option-radio"
              onClick={t => changeQueryType(t.target.value)}
            >
              <input
                type="radio"
                name="search__radio"
                defaultChecked
                className="search__radio"
                value="allWords"
              />
              ?????? ??????????
            </label>

            <label
              id="searchphraseall-lbl"
              className="option-radio"
              onClick={t => changeQueryType(t.target.value)}
            >
              <input
                type="radio"
                name="search__radio"
                className="search__radio"
                value="exactMatch"
              />
              ???????????? ????????????????????
            </label>
          </div>
        </div>

        <div className="search__ordering_box">
          <label className="search__ordering__label">?????????????? </label>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">??????????????</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              label="??????????????"
              onChange={t => changeSearchOrdering(t.target.value)}
            >
              <MenuItem value={null} defaultValue disabled>
                ??????????????
              </MenuItem>
              <MenuItem value="newest">?????????? ??????????????</MenuItem>
              <MenuItem value="oldest">???????????? ??????????????</MenuItem>
              <MenuItem value="popular">???????????????????? ??????????????</MenuItem>
              <MenuItem value="alphabet">???? ????????????????</MenuItem>
              <MenuItem value="category">??????????????????</MenuItem>
            </Select>
          </FormControl>
        </div>
      </fieldset>
      <fieldset className="search__only search__fieldset">
        <legend className="search__fieldset_legend">
          ?????????????????????? ?????????????? ????????????
        </legend>

        <label className="search__checkbox_label">
          <input
            type="checkbox"
            className="search__checkbox"
            value="departments"
            id="area-categories"
            onChange={e => {
              if (e.target.checked) {
                searchScope.categories = true;
              }
            }}
          />
          ????????????????????????
        </label>
        <label className="search__checkbox_label">
          <input
            type="checkbox"
            className="search__checkbox"
            value="content"
            id="area-content"
            onChange={e => {
              if (e.target.checked) {
                searchScope.content = true;
              }
            }}
          />
          ??????????????????
        </label>
        <label className="search__checkbox_label">
          <input
            type="checkbox"
            onChange={e => console.log(e)}
            className="search__checkbox"
            value="newsfeeds"
            id="area-newsfeeds"
            onChange={e => {
              if (e.target.checked) {
                searchScope.newsfeeds = true;
              }
            }}
          />
          ?????????? ????????????????
        </label>
        <label className="search__checkbox_label">
          <input
            type="checkbox"
            className="search__checkbox"
            value="journal"
            id="area-tags"
            onChange={e => {
              if (e.target.checked) {
                searchScope.journal = true;
              }
            }}
          />
          ????????????
        </label>
      </fieldset>
      <h6
        style={showNumberOfMatches ? { display: "block" } : { display: "none" }}
      >
        ?????????????? {responseData.length} ????????????????????
      </h6>
      <h1>????????????????????</h1>
      <div className="search-response__wrapper">
        {!isLoading ? (
          responseData.map((item, index) => (
            <ResponseBody
              page={item.page}
              text={item.text}
              key={index}
              number={index + 1}
              link={item.link}
              setPage={props.setPage}
              pageNumber={item.pageNumber}
            />
          ))
        ) : (
          <MyLoader />
        )}
      </div>
      {errorMessage.length !== 0 && (
        <h3 style={{ color: "red" }}>{errorMessage}</h3>
      )}
    </div>
  );
};

const ResponseBody = ({ page, text, link, setPage, pageNumber, number }) => {
  return (
    <div className="response__item">
      <Link
        to={link}
        onClick={() => {
          setPage(pageNumber);
          localStorage.setItem("page", pageNumber);
        }}
      >
        <h1>
          {number}. {page}
        </h1>
        <p>{text}</p>
      </Link>
    </div>
  );
};

export default Search;
