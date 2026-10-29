import { Product } from "@/components/product/columns";
import SearchProduct from "./searchProduct";
import styles from "./searchProduct.module.css";
import { envConfig } from "@/actions/config";
import { apiServerRequest } from "@/actions/apiConfig/config";

async function fetchProducts(query: string): Promise<Product[]> {
  if (!query) return [];

  try {
    const response = await apiServerRequest(
      `${envConfig.apiUrl}/inventory/search/${encodeURIComponent(query)}`,
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching products with Axios:", error);
    return [];
  }
}

export default async function SectionProduct(props: {
  searchParams?: Promise<{ product?: string }>;
}) {
  const params = await props.searchParams;
  const productQuery = params?.product ?? "";

  const products = await fetchProducts(productQuery);

  return (
    <section className={styles.togleContainer}>
      <h1 className={styles.text}>Encuentra tus Productos</h1>

      <SearchProduct initialProducts={products} searchQuery={productQuery} />
    </section>
  );
}
//IO
