import { createFileRoute } from "@tanstack/react-router";
import App from "../App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "L'Atelier by Lola | Head Spa Japonais & Institut de Beauté au Pré-Saint-Gervais",
      },
      {
        name: "description",
        content:
          "Découvrez L'Atelier by Lola au Pré-Saint-Gervais (93). Head Spa japonais, HydraFacial, Browlift, lissages, blanchiment dentaire et épilation définitive IPL dans un boudoir luxueux.",
      },
      {
        name: "keywords",
        content:
          "Head Spa, Head Spa Paris, Head Spa japonais, HydraFacial, Microneedling, Browlift, Pre-Saint-Gervais coiffeur, épilation définitive IPL, blanchiment dentaire, lissage brésilien",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content:
          "L'Atelier by Lola | Head Spa Japonais & Institut de Beauté d'Exception",
      },
      {
        property: "og:description",
        content:
          "Découvrez notre temple sensoriel au Pré-Saint-Gervais. Head Spa japonais authentique, HydraFacial, techniques de coiffures russes et soins prestigieux.",
      },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=1200",
      },
      { property: "og:url", content: "https://latelier-by-lola.fr" },
      { property: "og:site_name", content: "L'Atelier by Lola" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "L'Atelier by Lola | L'Éclat et le Bien-être Absolu",
      },
      {
        name: "twitter:description",
        content:
          "Un institut d'exception inspiré de l'ambiance épurée des spas de palaces parisiens. Réservez votre moment sacré de détente.",
      },
      {
        name: "twitter:image",
        content:
          "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=1200",
      },
    ],
  }),
  component: App,
});
