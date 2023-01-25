import CategoryPage from "@/components/templates/CategoryPage";

function Categories({ data }) {
  return <CategoryPage data={data} />;
}

export default Categories;

export async function getServerSideProps(context) {
  const {
    query: { difficulty, time },
  } = context;

  const res = await fetch(`${process.env.BASE_URL}/data`);
  const data = await res.json();

  const filteredData = data.filter((item) => {
    const difficultyResult = item.details.filter(
      (detail) => detail.Difficulty && detail.Difficulty === difficulty
    );
    const timeResult = item.details.filter((detail) => {
      const cookingTime = detail["Cooking Time"] || "";
      const timeDetail = cookingTime.split(" ")[0];
      if (time === "less" && timeDetail && timeDetail < 30) {
        return detail;
      } else if (time === "more" && timeDetail && timeDetail > 30) {
        return detail;
      }
    });
    if (difficulty && time && difficultyResult.length && timeResult.length) {
      return item;
    } else if (difficulty && !time && difficultyResult.length) {
      return item;
    } else if (!difficulty && time && timeResult.length) {
      return item;
    }
  });
  return {
    props: { data: filteredData },
  };
}
