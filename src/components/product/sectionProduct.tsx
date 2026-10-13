import { cookies } from "next/headers";
import { Product } from "@/components/product/columns";
import SearchProduct from "./searchProduct";
import axios from "axios";
import styles from "./searchProduct.module.css";
import { envConfig } from "@/actions/config";

async function fetchProducts(query: string): Promise<Product[]> {
  if (!query) return [];

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      console.warn("No se encontró la cookie authToken");
      return [];
    }

    const response = await axios.get(
      `${envConfig.apiUrl}/inventory/search/${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
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
