import { GoogleGenAI, Type } from "@google/genai";
import { Lead } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        company: {
          type: Type.STRING,
          description: "The name of the company or organization.",
        },
        contactName: {
          type: Type.STRING,
          description: "The name of the primary contact person for the lead.",
        },
        email: {
          type: Type.STRING,
          description: "The email address of the contact person or company.",
        },
        phone: {
          type: Type.STRING,
          description: "The phone number of the contact person or company.",
        },
      },
    },
};

export async function extractLeadsFromHtml(html: string): Promise<Lead[]> {
  const prompt = `
    You are an expert data extraction AI. Your task is to parse the following HTML content, which is from an Odoo CRM leads page.
    Identify each lead and extract the following information for each one:
    - Company Name
    - Contact Name
    - Email
    - Phone Number

    Please look carefully through the HTML structure to find the elements containing this data. The data for a single lead might be grouped together in a card, a list item, or a table row. Return the data as a JSON array of objects, where each object represents a single lead.
    Ensure your output strictly adheres to the provided JSON schema. If a piece of information (e.g., phone number) is not available for a lead, return an empty string for that field. Do not include leads that do not have at least a company name or contact name.

    Here is the HTML content to parse:
  `;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${prompt}\n\n${html}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    });
    
    const jsonText = response.text.trim();
    
    if (!jsonText) {
      return [];
    }

    const parsedJson = JSON.parse(jsonText);
    return parsedJson as Lead[];

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`AI model failed to process the request. Details: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI model.");
  }
}