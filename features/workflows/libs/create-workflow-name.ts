import "server-only";

import {
  animals,
  adjectives,
  uniqueNamesGenerator,
} from "unique-names-generator";

export const createWorkflowName = () => {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: "-",
    length: 2,
  });
};
