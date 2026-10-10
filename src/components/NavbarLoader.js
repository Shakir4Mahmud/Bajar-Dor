import Navbar from "./Navbar";
import { getCategories } from "@/lib/api";

export default async function NavbarLoader() {
  const categories = await getCategories();
  return <Navbar categories={categories} />;
}