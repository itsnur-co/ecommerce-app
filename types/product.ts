


export interface Product {
  id: string;
  slug: string;
  name: string;
  description?: string;
  averageRating?: string;
  image?: { sourceUrl: string; altText?: string };
  price?: string;
  regularPrice?: string;
  productCategories?: { nodes: { slug: string }[] };
}