import { db } from "./db";

// cf: https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
const URL_REGEX: RegExp = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

const generateUniqueSlug = async (): Promise<string> => {
  let slug = generateSlug();

  while (await db.link.findFirst({ where: { slug } })) {
    slug = generateSlug();
  }

  return slug;
};

const generateSlug = (): string => Math.trunc(Math.random() * Math.pow(10, 12)).toString(36);

const validateURL = (url: string): boolean => URL_REGEX.test(url);

export { generateUniqueSlug, validateURL };
