'use client';

import { useEffect } from 'react';
import { faqs } from '@/data/faqs';

interface SchemaInjectorProps {
  organizationSchema?: Record<string, any>;
  webpageSchema?: Record<string, any>;
  productSchema?: Record<string, any>;
}

export default function SchemaInjector({
  organizationSchema,
  webpageSchema,
  productSchema,
}: SchemaInjectorProps) {
  useEffect(() => {
    // Inject Organization schema if provided
    if (organizationSchema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'schema-organization';
      script.innerHTML = JSON.stringify(organizationSchema);
      document.head.appendChild(script);
    }

    // Inject WebPage schema if provided
    if (webpageSchema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'schema-webpage';
      script.innerHTML = JSON.stringify(webpageSchema);
      document.head.appendChild(script);
    }

    // Inject Product schema if provided
    if (productSchema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'schema-product';
      script.innerHTML = JSON.stringify(productSchema);
      document.head.appendChild(script);
    }

    // Inject FAQPage schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.id = 'schema-faq';
    faqScript.innerHTML = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    return () => {
      const scripts = document.querySelectorAll(
        '#schema-organization, #schema-webpage, #schema-product, #schema-faq'
      );
      scripts.forEach((script) => script.remove());
    };
  }, [organizationSchema, webpageSchema, productSchema]);

  return null;
}
