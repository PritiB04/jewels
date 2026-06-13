-- ============================================================
-- Jewels Marketplace - Full Schema Migration
-- ============================================================

-- 1. ENUMS
DROP TYPE IF EXISTS public.product_category CASCADE;
CREATE TYPE public.product_category AS ENUM ('rings', 'necklaces', 'bracelets', 'earrings');

DROP TYPE IF EXISTS public.order_status CASCADE;
CREATE TYPE public.order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered');

-- 2. CORE TABLES

-- customers (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  shipping_address JSONB,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- products
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- in cents
  category public.product_category NOT NULL,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  inventory_count INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- orders
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  stripe_session_id TEXT,
  status public.order_status NOT NULL DEFAULT 'pending'::public.order_status,
  total_amount INTEGER NOT NULL, -- in cents
  shipping_address JSONB,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- order_items
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL -- in cents
);

-- 3. INDEXES
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON public.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);

-- 4. TRIGGER FUNCTION: auto-create customer profile on auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.customers (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- 5. ENABLE RLS
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 6. RLS POLICIES

-- customers: users manage their own profile
DROP POLICY IF EXISTS "customers_manage_own" ON public.customers;
CREATE POLICY "customers_manage_own"
ON public.customers
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- products: public read, no write from client
DROP POLICY IF EXISTS "products_public_read" ON public.products;
CREATE POLICY "products_public_read"
ON public.products
FOR SELECT
TO public
USING (true);

-- orders: customers can view their own orders
DROP POLICY IF EXISTS "orders_customer_select" ON public.orders;
CREATE POLICY "orders_customer_select"
ON public.orders
FOR SELECT
TO authenticated
USING (customer_id = auth.uid());

-- orders: customers can insert their own orders
DROP POLICY IF EXISTS "orders_customer_insert" ON public.orders;
CREATE POLICY "orders_customer_insert"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (customer_id = auth.uid());

-- order_items: customers can view items belonging to their orders
DROP POLICY IF EXISTS "order_items_customer_select" ON public.order_items;
CREATE POLICY "order_items_customer_select"
ON public.order_items
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_items.order_id
    AND o.customer_id = auth.uid()
  )
);

-- order_items: customers can insert items for their own orders
DROP POLICY IF EXISTS "order_items_customer_insert" ON public.order_items;
CREATE POLICY "order_items_customer_insert"
ON public.order_items
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_items.order_id
    AND o.customer_id = auth.uid()
  )
);

-- 7. TRIGGER: fire after new auth user created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 8. STORAGE: product-images bucket (public read)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: public read
DROP POLICY IF EXISTS "product_images_public_read" ON storage.objects;
CREATE POLICY "product_images_public_read"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- Storage RLS: authenticated users can upload
DROP POLICY IF EXISTS "product_images_auth_upload" ON storage.objects;
CREATE POLICY "product_images_auth_upload"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- 9. SAMPLE PRODUCTS MOCK DATA
DO $$
BEGIN
  INSERT INTO public.products (id, name, description, price, category, images, inventory_count, is_featured)
  VALUES
    (gen_random_uuid(), 'Celestial Gold Ring', 'Delicate 18k gold-plated ring with star motif. Perfect for stacking.', 2999, 'rings'::public.product_category, ARRAY[]::TEXT[], 50, true),
    (gen_random_uuid(), 'Pearl Cascade Necklace', 'Freshwater pearl necklace with gold-fill chain. Minimal luxury at its finest.', 4999, 'necklaces'::public.product_category, ARRAY[]::TEXT[], 30, true),
    (gen_random_uuid(), 'Rose Gold Hoop Earrings', 'Classic 14k rose gold hoops. Lightweight and perfect for everyday wear.', 3499, 'earrings'::public.product_category, ARRAY[]::TEXT[], 75, true),
    (gen_random_uuid(), 'Dainty Chain Bracelet', 'Minimalist gold chain bracelet. Layer it or wear it solo.', 1999, 'bracelets'::public.product_category, ARRAY[]::TEXT[], 60, false),
    (gen_random_uuid(), 'Moonstone Solitaire Ring', 'Sterling silver ring with genuine moonstone. Ethereal and dreamy.', 5499, 'rings'::public.product_category, ARRAY[]::TEXT[], 20, true),
    (gen_random_uuid(), 'Layered Charm Necklace', 'Multi-strand necklace with tiny heart and star charms. Pinterest-worthy.', 3999, 'necklaces'::public.product_category, ARRAY[]::TEXT[], 40, false),
    (gen_random_uuid(), 'Crystal Drop Earrings', 'Swarovski crystal drop earrings in champagne gold. Effortlessly elegant.', 2799, 'earrings'::public.product_category, ARRAY[]::TEXT[], 45, false),
    (gen_random_uuid(), 'Twisted Bangle Bracelet', 'Gold-fill twisted bangle. Stackable and timeless.', 2499, 'bracelets'::public.product_category, ARRAY[]::TEXT[], 55, false)
  ON CONFLICT (id) DO NOTHING;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Mock data insertion failed: %', SQLERRM;
END $$;
