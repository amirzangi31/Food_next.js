import MenuPage from "../../components/templates/MenuPage";

function Index({ data }) {
  return <MenuPage data={data} />;
}

export default Index;

export async function getStaticProps() {
  const res = await fetch(`${process.env.BASE_URL}/data`);
  const data = await res.json();

  return {
    props: { data },
    revalidate: 3600, //seconds
  };
}
