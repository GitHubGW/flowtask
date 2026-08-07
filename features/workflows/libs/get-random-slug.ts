import {
  animals,
  adjectives,
  uniqueNamesGenerator,
} from "unique-names-generator";

export const getRandomSlug = () => {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: "-",
    length: 2,
  });
};
