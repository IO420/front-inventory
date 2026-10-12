import SearchProduct from "@/components/search/searchProduct";

export default async function Home(props: {
  searchParams?: Promise<{ product: string }>;
}) {
  const params = await props.searchParams;
  const product = params?.product ?? null;

  if(product){
    
  }

  return <SearchProduct />;
}
//IO
