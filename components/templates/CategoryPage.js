import { useEffect, useState } from "react";
import styles from "./CategoryPage.module.css";
import { useRouter } from "next/router";
import Card from "../modules/Card";

function CategoryPage({ data }) {
  const [query, setQuery] = useState({ difficulty: "", time: "" });
  const router = useRouter();


    useEffect(() => {
        const {difficulty , time} = router.query
        if(difficulty !== query.difficulty || time !== query.time){
            setQuery({difficulty , time})
        }
    } , [])

  const changeHandler = (event) => {
    setQuery({ ...query, [event.target.name]: event.target.value });
  };

  const searchHandler = () => {
    router.push({
      pathname: "categories",
      query,
    });
  };

  return (
    <div className={styles.container}>
      <h2>Categories</h2>
      <div className={styles.subContainer}>
        <div className={styles.select}>
          <select
            value={query.difficulty}
            name="difficulty"
            onChange={changeHandler}
          >
            <option value="">Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select value={query.time} name="time" onChange={changeHandler}>
            <option>Cooking Time</option>
            <option value="more">More than 30 min</option>
            <option value="less">Less than 30 min</option>
          </select>
          <button type="button" onClick={searchHandler}>
            Search
          </button>
        </div>
        <div className={styles.cards}>
            {!data.length && <img src="/images/search.png" alt="category" /> }
          {data.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
