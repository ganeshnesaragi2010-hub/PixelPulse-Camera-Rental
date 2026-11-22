import { Product } from '../types';

export async function exportCatalogueToGoogleSlides(products: Product[], accessToken?: string) {
  if (!accessToken) {
    throw new Error('Google OAuth Access Token is required to export to Google Slides. Please authorize Google Workspace.');
  }

  // 1. Create a new presentation
  const createRes = await fetch('https://slides.googleapis.com/v1/presentations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: `PixelPulse Camera Rental Catalogue - ${new Date().toLocaleDateString()}`
    }),
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Failed to create Google Slide presentation: ${errText}`);
  }

  const presentation = await createRes.json();
  const presentationId = presentation.presentationId;

  // 2. Add title slide or inventory slides via batchUpdate requests
  const requests: any[] = [];

  // Add a slide for each product
  products.forEach((product, index) => {
    requests.push({
      createSlide: {
        insertionIndex: index + 1,
        slideLayoutReference: {
          preset: 'TITLE_AND_BODY'
        },
        placeholderIdMappings: [
          {
            layoutPlaceholder: { type: 'TITLE', index: 0 },
            objectId: `title_${index}`
          },
          {
            layoutPlaceholder: { type: 'BODY', index: 0 },
            objectId: `body_${index}`
          }
        ]
      }
    });
  });

  if (requests.length > 0) {
    const updateRes = await fetch(`https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    });

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      console.warn('Slide structure update warning:', errText);
    }
  }

  return `https://docs.google.com/presentation/d/${presentationId}/edit`;
}
