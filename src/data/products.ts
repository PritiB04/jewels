export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  category: string;
  images: string[];
  badge?: string;
  description: string;
  material: string;
  sizes?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  colors?: string[];
  deliveryDays: number;
  sku: string;
}

export const products: Product[] = [
{
  id: 'p1',
  name: 'Celestine Layered Necklace',
  price: 48,
  originalPrice: 80,
  discount: 40,
  rating: 4.8,
  reviewCount: 312,
  category: 'Necklaces',
  images: [
  "https://img.rocket.new/generatedImages/rocket_gen_img_190f05db1-1772157709302.png",
  'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'],

  badge: '40% OFF',
  description: 'A delicate three-strand layered necklace in 18k rose gold vermeil. Each strand features hand-set cubic zirconia stones that catch the light beautifully. Perfect for layering or wearing alone for a minimalist look.',
  material: '18k Rose Gold Vermeil over Sterling Silver',
  isNew: false,
  isBestseller: true,
  deliveryDays: 3,
  sku: 'JW-NK-001'
},
{
  id: 'p2',
  name: 'Aurora Stacking Rings Set',
  price: 36,
  originalPrice: 60,
  discount: 40,
  rating: 4.9,
  reviewCount: 489,
  category: 'Rings',
  images: [
  "https://images.unsplash.com/photo-1721103428182-89ba395d44bf",
  'https://images.unsplash.com/photo-1573408301185-9519f94816b5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1586882829491-b81178aa622e?auto=format&fit=crop&w=800&q=80'],

  badge: 'Bestseller',
  description: 'A set of 5 ultra-thin stacking rings in varying widths. Mix and match across fingers for that effortless editorial look. Each ring features a different subtle texture — smooth, hammered, twisted, beaded, and plain band.',
  material: '14k Gold Fill',
  sizes: ['5', '6', '7', '8', '9'],
  isNew: false,
  isBestseller: true,
  deliveryDays: 2,
  sku: 'JW-RG-001'
},
{
  id: 'p3',
  name: 'Soleil Charm Bracelet',
  price: 42,
  originalPrice: 70,
  discount: 40,
  rating: 4.7,
  reviewCount: 198,
  category: 'Bracelets',
  images: [
  "https://images.unsplash.com/photo-1598472142233-24b3d71b65e1",
  'https://images.unsplash.com/photo-1573408301185-9519f94816b5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'],

  badge: 'New',
  description: 'A dainty chain bracelet adorned with five hand-selected charms: a crescent moon, a tiny star, a heart, a sun, and a cloud. Each charm is finished in polished rose gold for a cohesive, whimsical aesthetic.',
  material: '18k Rose Gold Vermeil',
  isNew: true,
  isBestseller: false,
  deliveryDays: 4,
  sku: 'JW-BR-001'
},
{
  id: 'p4',
  name: 'Pearl Drop Earrings',
  price: 32,
  originalPrice: 55,
  discount: 42,
  rating: 4.6,
  reviewCount: 267,
  category: 'Earrings',
  images: [
  "https://images.unsplash.com/photo-1590166223826-12dee1677420",
  'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80'],

  badge: '42% OFF',
  description: 'Freshwater baroque pearl drops suspended from a delicate gold wire. The irregular shape of each pearl is part of their natural beauty — no two pairs are exactly alike. A modern take on a timeless classic.',
  material: 'Freshwater Baroque Pearl + 14k Gold Fill',
  isNew: false,
  isBestseller: false,
  deliveryDays: 3,
  sku: 'JW-ER-001'
},
{
  id: 'p5',
  name: 'Lumière Tennis Bracelet',
  price: 68,
  originalPrice: 115,
  discount: 41,
  rating: 4.9,
  reviewCount: 156,
  category: 'Bracelets',
  images: [
  'https://images.unsplash.com/photo-1573408301185-9519f94816b5?auto=format&fit=crop&w=800&q=80',
  "https://images.unsplash.com/photo-1598472142233-24b3d71b65e1",
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
  "https://images.unsplash.com/photo-1721103428182-89ba395d44bf"],

  badge: 'Limited',
  description: 'A continuous line of round-cut cubic zirconia stones set in a flexible tennis bracelet. The prong setting allows maximum light refraction for that icy, high-jewelry look at a fraction of the price.',
  material: 'Sterling Silver + CZ Stones',
  isNew: false,
  isBestseller: false,
  deliveryDays: 5,
  sku: 'JW-BR-002'
},
{
  id: 'p6',
  name: 'Étoile Ear Cuff Set',
  price: 28,
  originalPrice: 45,
  discount: 38,
  rating: 4.7,
  reviewCount: 341,
  category: 'Earrings',
  images: [
  'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80',
  "https://images.unsplash.com/photo-1590166223826-12dee1677420",
  'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80'],

  badge: 'Trending',
  description: 'A set of three ear cuffs — one with a star motif, one plain arc, and one with a tiny crystal. No piercing required. The adjustable design fits most ear cartilage sizes comfortably.',
  material: 'Gold Plated Brass',
  isNew: true,
  isBestseller: false,
  deliveryDays: 3,
  sku: 'JW-ER-002'
}];


export const categories = [
{
  id: 'rings',
  name: 'Rings',
  count: 48,
  image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
  alt: 'Close-up of delicate gold stacking rings on a woman\'s hand, soft natural light, warm beige background, shallow depth of field'
},
{
  id: 'necklaces',
  name: 'Necklaces',
  count: 63,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_190f05db1-1772157709302.png",
  alt: 'Layered gold necklaces on a woman\'s collarbone, soft studio lighting, ivory linen background, editorial aesthetic'
},
{
  id: 'bracelets',
  name: 'Bracelets',
  count: 35,
  image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80',
  alt: 'Delicate gold charm bracelet on a woman\'s wrist, warm sunlight, airy lifestyle photography, soft shadows'
},
{
  id: 'earrings',
  name: 'Earrings',
  count: 52,
  image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
  alt: 'Elegant pearl drop earrings on a woman\'s ear, close-up portrait, soft diffused light, minimal background'
}];


export const testimonials = [
{
  id: 't1',
  name: 'Chloe Nakamura',
  location: 'Los Angeles, CA',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ea9e79c2-1772257220960.png",
  rating: 5,
  text: 'The Celestine necklace is literally my most-worn piece. I get compliments every single day. The quality feels so much more expensive than what I paid.',
  product: 'Celestine Layered Necklace',
  verified: true
},
{
  id: 't2',
  name: 'Maya Rodriguez',
  location: 'Brooklyn, NY',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fc2e5465-1772215195588.png",
  rating: 5,
  text: 'Ordered the Aurora ring set and it arrived in the cutest packaging. The rings are so dainty and perfect for stacking. Already ordered two more sets as gifts.',
  product: 'Aurora Stacking Rings Set',
  verified: true
},
{
  id: 't3',
  name: 'Priya Sharma',
  location: 'Chicago, IL',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18a233208-1764747336200.png",
  rating: 5,
  text: 'Crafters has completely replaced my other jewelry brands. The aesthetic is exactly what I\'ve been searching for — minimal, delicate, and so Pinterest-worthy.',
  product: 'Pearl Drop Earrings',
  verified: true
}];


export const reviews = [
{
  id: 'r1',
  author: 'Sophie Chen',
  avatar: "https://images.unsplash.com/photo-1656422124200-acfb0da8e9df",
  rating: 5,
  date: 'May 18, 2026',
  title: 'Absolutely obsessed',
  body: 'This is my third order from Crafters and they never disappoint. The packaging is gorgeous and the jewelry itself is even better in person. The rose gold color is exactly as shown.',
  helpful: 24,
  verified: true
},
{
  id: 'r2',
  author: 'Aisha Williams',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18a233208-1764747336200.png",
  rating: 5,
  date: 'May 12, 2026',
  title: 'Perfect for layering',
  body: 'I bought this specifically to layer with my other necklaces and it looks stunning. The quality is incredible for the price point. Highly recommend.',
  helpful: 18,
  verified: true
},
{
  id: 'r3',
  author: 'Zoe Patterson',
  avatar: "https://images.unsplash.com/photo-1636077492949-9d39eb739efc",
  rating: 4,
  date: 'May 5, 2026',
  title: 'Beautiful but runs small',
  body: 'The bracelet is gorgeous but runs slightly smaller than expected. I\'d recommend sizing up. The quality is excellent and it looks exactly like the photos.',
  helpful: 12,
  verified: true
}];