'use client';

import { useEffect } from 'react';
import { faqs } from '@/data/faqs';

interface SchemaInjectorProps {
  organizationSchema?: Record<string, any>;
  webpageSchema?: Record<string, any>;
  productSchema?: Record<string, any>;
}

function injectSchema(id: string, data: Record<string, any>) {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.innerHTML = JSON.stringify(data);
  document.head.appendChild(script);
}

export default function SchemaInjector({
  organizationSchema,
  webpageSchema,
  productSchema,
}: SchemaInjectorProps) {
  useEffect(() => {
    if (organizationSchema) {
      injectSchema('schema-organization', organizationSchema);
    }

    if (webpageSchema) {
      injectSchema('schema-webpage', webpageSchema);
    }

    if (productSchema) {
      injectSchema('schema-product', productSchema);
    }

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

    injectSchema('schema-faq', faqSchema);

    return () => {
      ['schema-webpage', 'schema-product', 'schema-faq'].forEach((id) => {
        document.getElementById(id)?.remove();
      });
    };
  }, [organizationSchema, webpageSchema, productSchema]);

  return null;
}
