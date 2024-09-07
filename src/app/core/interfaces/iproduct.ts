export interface Iproduct {
  sold: number;
  images: string[];
  subcategory: [];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Brand;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;

}
